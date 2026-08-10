export const ORDER_STATUS_TRANSITIONS = {
    PENDING_PAYMENT: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["PROCESSING", "CANCELLED"],
    PROCESSING: ["SHIPPED", "CANCELLED"],
    SHIPPED: ["DELIVERED"],
    DELIVERED: ["REFUNDED"],
    CANCELLED: [],
    REFUNDED: [],
};
export const PAYMENT_STATUS_TRANSITIONS = {
    PENDING: ["PAID", "FAILED", "CANCELLED"],
    FAILED: ["PENDING", "CANCELLED"],
    PAID: ["REFUNDED"],
    REFUNDED: [],
    CANCELLED: [],
};
export function isOrderStatusTransitionCompatible(order, nextStatus) {
    if (!ORDER_STATUS_TRANSITIONS[order.status].includes(nextStatus)) {
        return false;
    }
    if ((nextStatus === "CONFIRMED" || nextStatus === "SHIPPED") &&
        order.paymentMethod !== "CASH_ON_DELIVERY" &&
        order.paymentStatus !== "PAID") {
        return false;
    }
    if (nextStatus === "REFUNDED" &&
        order.paymentStatus !== "REFUNDED") {
        return false;
    }
    return true;
}
export function isPaymentStatusTransitionCompatible(order, nextStatus) {
    if (!PAYMENT_STATUS_TRANSITIONS[order.paymentStatus].includes(nextStatus)) {
        return false;
    }
    if (nextStatus === "PAID" &&
        (order.orderStatus === "CANCELLED" ||
            order.orderStatus === "REFUNDED")) {
        return false;
    }
    if ((nextStatus === "PENDING" || nextStatus === "CANCELLED") &&
        order.orderStatus !== "PENDING_PAYMENT" &&
        order.orderStatus !== "CANCELLED") {
        return false;
    }
    if (nextStatus === "REFUNDED" &&
        !["DELIVERED", "CANCELLED", "REFUNDED"].includes(order.orderStatus)) {
        return false;
    }
    return true;
}
export function getAllowedOrderStatusTransitions(order) {
    return ORDER_STATUS_TRANSITIONS[order.status].filter((nextStatus) => isOrderStatusTransitionCompatible(order, nextStatus));
}
export function getAllowedPaymentStatusTransitions(order) {
    return PAYMENT_STATUS_TRANSITIONS[order.paymentStatus].filter((nextStatus) => isPaymentStatusTransitionCompatible(order, nextStatus));
}
//# sourceMappingURL=orderTransitions.js.map