import type { OrderStatus, PaymentMethod, PaymentStatus } from "../generated/prisma/enums.js";
export declare const ORDER_STATUS_TRANSITIONS: {
    readonly PENDING_PAYMENT: readonly ["CONFIRMED", "CANCELLED"];
    readonly CONFIRMED: readonly ["PROCESSING", "CANCELLED"];
    readonly PROCESSING: readonly ["SHIPPED", "CANCELLED"];
    readonly SHIPPED: readonly ["DELIVERED"];
    readonly DELIVERED: readonly ["REFUNDED"];
    readonly CANCELLED: readonly [];
    readonly REFUNDED: readonly [];
};
export declare const PAYMENT_STATUS_TRANSITIONS: {
    readonly PENDING: readonly ["PAID", "FAILED", "CANCELLED"];
    readonly FAILED: readonly ["PENDING", "CANCELLED"];
    readonly PAID: readonly ["REFUNDED"];
    readonly REFUNDED: readonly [];
    readonly CANCELLED: readonly [];
};
type OrderTransitionContext = {
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    paymentMethod: PaymentMethod;
};
type PaymentTransitionContext = {
    orderStatus: OrderStatus;
    paymentStatus: PaymentStatus;
};
export declare function isOrderStatusTransitionCompatible(order: OrderTransitionContext, nextStatus: OrderStatus): boolean;
export declare function isPaymentStatusTransitionCompatible(order: PaymentTransitionContext, nextStatus: PaymentStatus): boolean;
export declare function getAllowedOrderStatusTransitions(order: OrderTransitionContext): OrderStatus[];
export declare function getAllowedPaymentStatusTransitions(order: PaymentTransitionContext): PaymentStatus[];
export {};
//# sourceMappingURL=orderTransitions.d.ts.map