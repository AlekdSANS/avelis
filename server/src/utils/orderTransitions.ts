import type {
	OrderStatus,
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

export function getAllowedOrderStatusTransitions(status: OrderStatus) {
	return [...ORDER_STATUS_TRANSITIONS[status]] as OrderStatus[];
}

export function getAllowedPaymentStatusTransitions(status: PaymentStatus) {
	return [...PAYMENT_STATUS_TRANSITIONS[status]] as PaymentStatus[];
}
