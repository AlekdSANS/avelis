import type {
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
} from "../generated/prisma/enums.js";

export const ORDER_STATUS_TRANSITIONS = {
	PENDING_PAYMENT: ["CONFIRMED", "CANCELLED"],
	CONFIRMED: ["PROCESSING", "CANCELLED"],
	PROCESSING: ["SHIPPED", "CANCELLED"],
	SHIPPED: ["DELIVERED"],
	DELIVERED: ["REFUNDED"],
	CANCELLED: [],
	REFUNDED: [],
} as const satisfies Record<OrderStatus, readonly OrderStatus[]>;

export const PAYMENT_STATUS_TRANSITIONS = {
	PENDING: ["PAID", "FAILED", "CANCELLED"],
	FAILED: ["PENDING", "CANCELLED"],
	PAID: ["REFUNDED"],
	REFUNDED: [],
	CANCELLED: [],
} as const satisfies Record<PaymentStatus, readonly PaymentStatus[]>;

type OrderTransitionContext = {
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	paymentMethod: PaymentMethod;
};

type PaymentTransitionContext = {
	orderStatus: OrderStatus;
	paymentStatus: PaymentStatus;
};

export function isOrderStatusTransitionCompatible(
	order: OrderTransitionContext,
	nextStatus: OrderStatus,
) {
	if (!ORDER_STATUS_TRANSITIONS[order.status].includes(nextStatus as never)) {
		return false;
	}

	if (
		(nextStatus === "CONFIRMED" || nextStatus === "SHIPPED") &&
		order.paymentMethod !== "CASH_ON_DELIVERY" &&
		order.paymentStatus !== "PAID"
	) {
		return false;
	}

	if (
		nextStatus === "REFUNDED" &&
		order.paymentStatus !== "REFUNDED"
	) {
		return false;
	}

	return true;
}

export function isPaymentStatusTransitionCompatible(
	order: PaymentTransitionContext,
	nextStatus: PaymentStatus,
) {
	if (
		!PAYMENT_STATUS_TRANSITIONS[order.paymentStatus].includes(
			nextStatus as never,
		)
	) {
		return false;
	}

	if (
		nextStatus === "PAID" &&
		(order.orderStatus === "CANCELLED" ||
			order.orderStatus === "REFUNDED")
	) {
		return false;
	}

	if (
		(nextStatus === "PENDING" || nextStatus === "CANCELLED") &&
		order.orderStatus !== "PENDING_PAYMENT" &&
		order.orderStatus !== "CANCELLED"
	) {
		return false;
	}

	if (
		nextStatus === "REFUNDED" &&
		!["DELIVERED", "CANCELLED", "REFUNDED"].includes(order.orderStatus)
	) {
		return false;
	}

	return true;
}

export function getAllowedOrderStatusTransitions(
	order: OrderTransitionContext,
) {
	return ORDER_STATUS_TRANSITIONS[order.status].filter((nextStatus) =>
		isOrderStatusTransitionCompatible(order, nextStatus),
	) as OrderStatus[];
}

export function getAllowedPaymentStatusTransitions(
	order: PaymentTransitionContext,
) {
	return PAYMENT_STATUS_TRANSITIONS[order.paymentStatus].filter((nextStatus) =>
		isPaymentStatusTransitionCompatible(order, nextStatus),
	) as PaymentStatus[];
}
