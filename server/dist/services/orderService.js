import { createHash } from "node:crypto";
import { createOrderAtomically, findCustomerOrderByNumber, findCustomerOrderPage, } from "../repositories/orderRepository.js";
import { HttpError } from "../utils/httpError.js";
import { mapOrderDetail, mapOrderSummary, } from "../utils/orderMapper.js";
const MAX_QUANTITY_PER_VARIANT = 20;
export function mergeOrderItems(items) {
    const quantityByVariant = new Map();
    for (const item of items) {
        const quantity = (quantityByVariant.get(item.variantId) ?? 0) + item.quantity;
        if (quantity > MAX_QUANTITY_PER_VARIANT) {
            throw new HttpError(400, `Quantity for variant ${item.variantId} exceeds the per-item limit`);
        }
        quantityByVariant.set(item.variantId, quantity);
    }
    return [...quantityByVariant]
        .map(([variantId, quantity]) => ({
        variantId,
        quantity,
    }))
        .sort((left, right) => left.variantId.localeCompare(right.variantId));
}
export function getIdempotencyScope(userId, email, phone) {
    if (userId !== null) {
        return `user:${userId}`;
    }
    const guestIdentityHash = createHash("sha256")
        .update(`${email}\0${phone}`)
        .digest("hex");
    return `guest:${guestIdentityHash}`;
}
export async function createOrder(input, userId) {
    const result = await createOrderAtomically({
        userId,
        idempotencyScope: input.idempotencyKey === undefined
            ? null
            : getIdempotencyScope(userId, input.customer.email, input.customer.phone),
        idempotencyKey: input.idempotencyKey ?? null,
        customer: input.customer,
        shippingAddress: {
            ...input.shippingAddress,
            apartment: input.shippingAddress.apartment ?? null,
            deliveryNotes: input.shippingAddress.deliveryNotes ?? null,
        },
        shippingMethod: input.shippingMethod,
        paymentMethod: input.paymentMethod,
        items: mergeOrderItems(input.items),
    });
    return {
        data: mapOrderDetail(result.order),
        replayed: result.replayed,
    };
}
export async function listCustomerOrders(userId, query) {
    const [total, orders] = await findCustomerOrderPage(userId, query);
    return {
        data: orders.map(mapOrderSummary),
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
    };
}
export async function getCustomerOrder(userId, orderNumber) {
    const order = await findCustomerOrderByNumber(userId, orderNumber);
    if (order === null) {
        throw new HttpError(404, "Order not found");
    }
    return {
        data: mapOrderDetail(order),
    };
}
//# sourceMappingURL=orderService.js.map