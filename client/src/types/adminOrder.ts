import type { ApiResponse, PaginatedResponse } from "./api";
import type {
	OrderItemFormat,
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
	ShippingMethod,
} from "./order";

export type AdminOrderSort =
	| "newest"
	| "oldest"
	| "total-asc"
	| "total-desc";

export interface AdminOrderListParams {
	search?: string;
	status?: OrderStatus;
	paymentStatus?: PaymentStatus;
	paymentMethod?: PaymentMethod;
	shippingMethod?: ShippingMethod;
	dateFrom?: string;
	dateTo?: string;
	minTotal?: number;
	maxTotal?: number;
	sort?: AdminOrderSort;
	page?: number;
	limit?: number;
}

export interface AdminOrderListItem {
	orderNumber: string;
	customerName: string;
	customerEmail: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	paymentMethod: PaymentMethod;
	shippingMethod: ShippingMethod;
	itemCount: number;
	total: number;
	currency: string;
	firstItemImageUrl: string | null;
	createdAt: string;
}

export type AdminOrderListResponse =
	PaginatedResponse<AdminOrderListItem>;

export interface AdminOrderCustomer {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
}

export interface AdminOrderLinkedAccount {
	firstName: string;
	lastName: string;
	email: string;
}

export interface AdminOrderShippingAddress {
	country: string;
	city: string;
	postalCode: string;
	street: string;
	building: string;
	apartment: string | null;
}

export interface AdminOrderItemSnapshot {
	productName: string;
	productSlug: string;
	sku: string;
	format: OrderItemFormat;
	volumeMl: number;
	unitPrice: number;
	quantity: number;
	lineTotal: number;
	imageUrl: string | null;
}

export interface AdminOrderDetail {
	orderNumber: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	paymentMethod: PaymentMethod;
	shippingMethod: ShippingMethod;
	customer: AdminOrderCustomer;
	linkedAccount: AdminOrderLinkedAccount | null;
	shippingAddress: AdminOrderShippingAddress;
	deliveryNotes: string | null;
	items: AdminOrderItemSnapshot[];
	subtotal: number;
	shippingTotal: number;
	discountTotal: number;
	total: number;
	currency: string;
	confirmedAt: string | null;
	cancelledAt: string | null;
	createdAt: string;
	updatedAt: string;
	allowedTransitions: {
		orderStatus: OrderStatus[];
		paymentStatus: PaymentStatus[];
	};
}

export type AdminOrderDetailResponse = ApiResponse<AdminOrderDetail>;

export interface AdminOrderStatusUpdateInput {
	status: OrderStatus;
}

export interface AdminPaymentStatusUpdateInput {
	paymentStatus: PaymentStatus;
}
