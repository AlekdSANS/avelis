import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { INITIAL_ORDER_STATUS, INITIAL_PAYMENT_STATUS, ORDER_CURRENCY, getShippingPrice, } from "../config/order.js";
import { HttpError } from "../utils/httpError.js";
import { orderDetailSelect, orderSummarySelect, } from "../utils/orderMapper.js";
import { generateOrderNumber } from "../utils/orderNumber.js";
const MAX_ORDER_NUMBER_ATTEMPTS = 5;
const checkoutVariantSelect = {
    id: true,
    productId: true,
    format: true,
    volumeMl: true,
    price: true,
    sku: true,
    stock: true,
    product: {
        select: {
            name: true,
            slug: true,
            isActive: true,
            images: {
                select: {
                    url: true,
                    imageType: true,
                    isPrimary: true,
                    position: true,
                },
                orderBy: [{ position: "asc" }, { createdAt: "asc" }],
            },
        },
    },
};
function getPrimaryImageUrl(images, format) {
    const preferredType = format === "REFILL" ? "REFILL" : "MAIN";
    return (images.find((image) => image.imageType === preferredType)?.url ??
        images.find((image) => image.isPrimary)?.url ??
        images[0]?.url ??
        null);
}
function isUniqueConstraintError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002");
}
function isRetryableTransactionError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2034");
}
function idempotentReplayResult(input, order) {
    if (input.userId === null) {
        throw new HttpError(409, "An order already exists for this idempotency key");
    }
    return {
        order,
        replayed: true,
    };
}
async function findIdempotentOrder(input) {
    if (input.idempotencyScope === null || input.idempotencyKey === null) {
        return null;
    }
    return prisma.order.findUnique({
        where: {
            idempotencyScope_idempotencyKey: {
                idempotencyScope: input.idempotencyScope,
                idempotencyKey: input.idempotencyKey,
            },
        },
        select: orderDetailSelect,
    });
}
function buildLineItems(variants, requestedItems) {
    const variantById = new Map(variants.map((variant) => [variant.id, variant]));
    return requestedItems.map((requestedItem) => {
        const variant = variantById.get(requestedItem.variantId);
        if (variant === undefined) {
            throw new HttpError(400, "One or more product variants are unavailable");
        }
        if (!variant.product.isActive) {
            throw new HttpError(409, `Product for SKU ${variant.sku} is unavailable`);
        }
        if (variant.stock < requestedItem.quantity) {
            throw new HttpError(409, `Insufficient stock for SKU ${variant.sku}`);
        }
        const unitPrice = variant.price.toDecimalPlaces(2);
        const lineTotal = unitPrice
            .mul(requestedItem.quantity)
            .toDecimalPlaces(2);
        return {
            variant,
            quantity: requestedItem.quantity,
            unitPrice,
            lineTotal,
        };
    });
}
async function createOrderAttempt(input) {
    return prisma.$transaction(async (tx) => {
        if (input.idempotencyScope !== null &&
            input.idempotencyKey !== null) {
            const existingOrder = await tx.order.findUnique({
                where: {
                    idempotencyScope_idempotencyKey: {
                        idempotencyScope: input.idempotencyScope,
                        idempotencyKey: input.idempotencyKey,
                    },
                },
                select: orderDetailSelect,
            });
            if (existingOrder !== null) {
                return idempotentReplayResult(input, existingOrder);
            }
        }
        const variants = await tx.productVariant.findMany({
            where: {
                id: {
                    in: input.items.map((item) => item.variantId),
                },
            },
            select: checkoutVariantSelect,
        });
        const lineItems = buildLineItems(variants, input.items);
        const subtotal = lineItems
            .reduce((sum, item) => sum.plus(item.lineTotal), new Prisma.Decimal(0))
            .toDecimalPlaces(2);
        const shippingTotal = getShippingPrice(input.shippingMethod);
        const discountTotal = new Prisma.Decimal(0).toDecimalPlaces(2);
        const total = subtotal
            .plus(shippingTotal)
            .minus(discountTotal)
            .toDecimalPlaces(2);
        const order = await tx.order.create({
            data: {
                orderNumber: generateOrderNumber(),
                userId: input.userId,
                customerEmail: input.customer.email,
                customerFirstName: input.customer.firstName,
                customerLastName: input.customer.lastName,
                customerPhone: input.customer.phone,
                shippingCountry: input.shippingAddress.country,
                shippingCity: input.shippingAddress.city,
                shippingPostalCode: input.shippingAddress.postalCode,
                shippingStreet: input.shippingAddress.street,
                shippingBuilding: input.shippingAddress.building,
                shippingApartment: input.shippingAddress.apartment,
                deliveryNotes: input.shippingAddress.deliveryNotes,
                shippingMethod: input.shippingMethod,
                paymentMethod: input.paymentMethod,
                paymentStatus: INITIAL_PAYMENT_STATUS,
                status: INITIAL_ORDER_STATUS,
                subtotal,
                shippingTotal,
                discountTotal,
                total,
                currency: ORDER_CURRENCY,
                idempotencyScope: input.idempotencyScope,
                idempotencyKey: input.idempotencyKey,
                items: {
                    create: lineItems.map((item) => ({
                        productId: item.variant.productId,
                        variantId: item.variant.id,
                        productName: item.variant.product.name,
                        productSlug: item.variant.product.slug,
                        sku: item.variant.sku,
                        format: item.variant.format,
                        volumeMl: item.variant.volumeMl,
                        unitPrice: item.unitPrice,
                        quantity: item.quantity,
                        lineTotal: item.lineTotal,
                        imageUrl: getPrimaryImageUrl(item.variant.product.images, item.variant.format),
                    })),
                },
            },
            select: orderDetailSelect,
        });
        for (const item of lineItems) {
            const stockUpdate = await tx.productVariant.updateMany({
                where: {
                    id: item.variant.id,
                    stock: {
                        gte: item.quantity,
                    },
                    product: {
                        isActive: true,
                    },
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
            if (stockUpdate.count !== 1) {
                throw new HttpError(409, `Insufficient stock for SKU ${item.variant.sku}`);
            }
        }
        return {
            order,
            replayed: false,
        };
    }, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
    });
}
export async function createOrderAtomically(input) {
    for (let attempt = 1; attempt <= MAX_ORDER_NUMBER_ATTEMPTS; attempt += 1) {
        try {
            return await createOrderAttempt(input);
        }
        catch (error) {
            if (isRetryableTransactionError(error) &&
                attempt < MAX_ORDER_NUMBER_ATTEMPTS) {
                continue;
            }
            if (!isUniqueConstraintError(error)) {
                throw error;
            }
            const existingOrder = await findIdempotentOrder(input);
            if (existingOrder !== null) {
                return idempotentReplayResult(input, existingOrder);
            }
            if (attempt === MAX_ORDER_NUMBER_ATTEMPTS) {
                throw error;
            }
        }
    }
    throw new Error("Order number retry limit exhausted");
}
export async function findCustomerOrderPage(userId, query) {
    const where = {
        userId,
    };
    if (query.status !== undefined) {
        where.status = query.status;
    }
    return prisma.$transaction([
        prisma.order.count({
            where,
        }),
        prisma.order.findMany({
            where,
            select: orderSummarySelect,
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        }),
    ]);
}
export function findCustomerOrderByNumber(userId, orderNumber) {
    return prisma.order.findFirst({
        where: {
            orderNumber,
            userId,
        },
        select: orderDetailSelect,
    });
}
//# sourceMappingURL=orderRepository.js.map