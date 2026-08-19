import type { ApiResponse } from "./api";
import type { OrderStatus, PaymentStatus } from "./order";

export interface AdminProductSummary {
	total: number;
	active: number;
	inactive: number;
	lowStockVariants: number;
}

export interface AdminOrderSummary {
	total: number;
	pendingPayment: number;
	processing: number;
	shipped: number;
	delivered: number;
}

export interface AdminCustomerSummary {
	total: number;
}

export interface AdminRevenueSummary {
	total: number;
	currency: string;
}

export interface AdminRecentOrder {
	orderNumber: string;
	customerName: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	total: number;
	currency: string;
	createdAt: string;
}

export interface AdminDashboard {
	products: AdminProductSummary;
	orders: AdminOrderSummary;
	customers: AdminCustomerSummary;
	revenue: AdminRevenueSummary;
	recentOrders: AdminRecentOrder[];
}

export type AdminDashboardResponse = ApiResponse<AdminDashboard>;
