import { getAllowedOrderStatusTransitions, getAllowedPaymentStatusTransitions, } from "./orderTransitions.js";
export const adminOrderSummarySelect = {
    orderNumber: true,
    customerFirstName: true,
    customerLastName: true,
    customerEmail: true,
    status: true,
    paymentStatus: true,
    paymentMethod: true,
    shippingMethod: true,
    total: true,
    currency: true,
    createdAt: true,
    _count: {
        select: {
            items: true,
        },
    },
    items: {
        select: {
            imageUrl: true,
        },
        orderBy: [{ id: "asc" }],
        take: 1,
    },
};
export const adminOrderDetailSelect = {
    orderNumber: true,
    status: true,
    paymentStatus: true,
    paymentMethod: true,
    shippingMethod: true,
    customerEmail: true,
    customerFirstName: true,
    customerLastName: true,
    customerPhone: true,
    shippingCountry: true,
    shippingCity: true,
    shippingPostalCode: true,
    shippingStreet: true,
    shippingBuilding: true,
    shippingApartment: true,
    deliveryNotes: true,
    subtotal: true,
    shippingTotal: true,
    discountTotal: true,
    total: true,
    currency: true,
    confirmedAt: true,
    cancelledAt: true,
    createdAt: true,
    updatedAt: true,
    user: {
        select: {
            firstName: true,
            lastName: true,
            email: true,
        },
    },
    items: {
        select: {
            productName: true,
            productSlug: true,
            sku: true,
            format: true,
            volumeMl: true,
            unitPrice: true,
            quantity: true,
            lineTotal: true,
            imageUrl: true,
        },
        orderBy: [{ id: "asc" }],
    },
};
function moneyToNumber(value) {
    return value.toDecimalPlaces(2).toNumber();
}
function customerDisplayName(order) {
    const fullName = [order.customerFirstName, order.customerLastName]
        .map((part) => part.trim())
        .filter(Boolean)
        .join(" ");
    return fullName || order.customerEmail;
}
export function mapAdminOrderSummary(order) {
    return {
        orderNumber: order.orderNumber,
        customerName: customerDisplayName(order),
        customerEmail: order.customerEmail,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        itemCount: order._count.items,
        total: moneyToNumber(order.total),
        currency: order.currency,
        firstItemImageUrl: order.items[0]?.imageUrl ?? null,
        createdAt: order.createdAt.toISOString(),
    };
}
export function mapAdminOrderDetail(order) {
    return {
        orderNumber: order.orderNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        customer: {
            firstName: order.customerFirstName,
            lastName: order.customerLastName,
            email: order.customerEmail,
            phone: order.customerPhone,
        },
        linkedAccount: order.user === null
            ? null
            : {
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                email: order.user.email,
            },
        shippingAddress: {
            country: order.shippingCountry,
            city: order.shippingCity,
            postalCode: order.shippingPostalCode,
            street: order.shippingStreet,
            building: order.shippingBuilding,
            apartment: order.shippingApartment,
        },
        deliveryNotes: order.deliveryNotes,
        items: order.items.map((item) => ({
            productName: item.productName,
            productSlug: item.productSlug,
            sku: item.sku,
            format: item.format,
            volumeMl: item.volumeMl,
            unitPrice: moneyToNumber(item.unitPrice),
            quantity: item.quantity,
            lineTotal: moneyToNumber(item.lineTotal),
            imageUrl: item.imageUrl,
        })),
        subtotal: moneyToNumber(order.subtotal),
        shippingTotal: moneyToNumber(order.shippingTotal),
        discountTotal: moneyToNumber(order.discountTotal),
        total: moneyToNumber(order.total),
        currency: order.currency,
        confirmedAt: order.confirmedAt?.toISOString() ?? null,
        cancelledAt: order.cancelledAt?.toISOString() ?? null,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        allowedTransitions: {
            orderStatus: getAllowedOrderStatusTransitions({
                status: order.status,
                paymentStatus: order.paymentStatus,
                paymentMethod: order.paymentMethod,
            }),
            paymentStatus: getAllowedPaymentStatusTransitions({
                orderStatus: order.status,
                paymentStatus: order.paymentStatus,
            }),
        },
    };
}
//# sourceMappingURL=adminOrderMapper.js.map