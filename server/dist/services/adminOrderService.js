import { findAdminOrderByNumber, findAdminOrderPage, updateAdminOrderStatusAtomically, updateAdminPaymentStatusAtomically, } from "../repositories/adminOrderRepository.js";
import { mapAdminOrderDetail, mapAdminOrderSummary, } from "../utils/adminOrderMapper.js";
import { HttpError } from "../utils/httpError.js";
import { isOrderStatusTransitionCompatible, isPaymentStatusTransitionCompatible, } from "../utils/orderTransitions.js";
export async function listAdminOrders(query) {
    const [total, orders] = await findAdminOrderPage(query);
    return {
        data: orders.map(mapAdminOrderSummary),
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
    };
}
export async function getAdminOrder(orderNumber) {
    const order = await findAdminOrderByNumber(orderNumber);
    if (order === null) {
        throw new HttpError(404, "Order not found");
    }
    return {
        data: mapAdminOrderDetail(order),
    };
}
function mapOrderTransitionError(error) {
    if (error instanceof Error) {
        if (error.message === "ADMIN_ORDER_NOT_FOUND") {
            throw new HttpError(404, "Order not found");
        }
        if (error.message === "ADMIN_ORDER_TRANSITION_CONFLICT") {
            throw new HttpError(409, "Order changed while this update was being processed. Refresh and try again.");
        }
    }
    throw error;
}
function validateOrderStatusTransition(order, nextStatus) {
    if (isOrderStatusTransitionCompatible({
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
    }, nextStatus)) {
        return;
    }
    if ((nextStatus === "CONFIRMED" || nextStatus === "SHIPPED") &&
        order.paymentMethod !== "CASH_ON_DELIVERY" &&
        order.paymentStatus !== "PAID") {
        throw new HttpError(409, `Payment must be marked paid before this order can be ${nextStatus.toLowerCase()}.`);
    }
    if (nextStatus === "REFUNDED" && order.paymentStatus !== "REFUNDED") {
        throw new HttpError(409, "Payment must be marked refunded before the order can be refunded.");
    }
    throw new HttpError(409, `Order status cannot move from ${order.status} to ${nextStatus}.`);
}
function validatePaymentStatusTransition(order, nextStatus) {
    if (isPaymentStatusTransitionCompatible({
        orderStatus: order.status,
        paymentStatus: order.paymentStatus,
    }, nextStatus)) {
        return;
    }
    if (nextStatus === "REFUNDED" &&
        !["DELIVERED", "CANCELLED", "REFUNDED"].includes(order.status)) {
        throw new HttpError(409, "Payment can only be marked refunded after delivery or cancellation.");
    }
    throw new HttpError(409, `Payment status cannot move from ${order.paymentStatus} to ${nextStatus} for this order.`);
}
export async function setAdminOrderStatus(orderNumber, input) {
    try {
        const order = await updateAdminOrderStatusAtomically(orderNumber, input.status, (current) => validateOrderStatusTransition(current, input.status));
        return {
            data: mapAdminOrderDetail(order),
            message: input.status === "CANCELLED"
                ? "Order cancelled. Stock was not automatically restored."
                : "Order status updated.",
        };
    }
    catch (error) {
        if (error instanceof HttpError) {
            throw error;
        }
        mapOrderTransitionError(error);
    }
}
export async function setAdminPaymentStatus(orderNumber, input) {
    try {
        const order = await updateAdminPaymentStatusAtomically(orderNumber, input.paymentStatus, (current) => validatePaymentStatusTransition(current, input.paymentStatus));
        return {
            data: mapAdminOrderDetail(order),
            message: input.paymentStatus === "REFUNDED"
                ? "Payment marked refunded. No external refund was initiated."
                : "Payment status updated.",
        };
    }
    catch (error) {
        if (error instanceof HttpError) {
            throw error;
        }
        mapOrderTransitionError(error);
    }
}
//# sourceMappingURL=adminOrderService.js.map