import type { Prisma } from "../generated/prisma/client.js";
import type { OrderStatus } from "../generated/prisma/enums.js";
import { ADMIN_DASHBOARD_CURRENCY } from "../config/admin.js";

export const adminRecentOrderSelect = {
	orderNumber: true,
	customerFirstName: true,
	customerLastName: true,
	customerEmail: true,
	status: true,
	paymentStatus: true,
	total: true,
	currency: true,
	createdAt: true,
} satisfies Prisma.OrderSelect;

export type AdminRecentOrderRecord = Prisma.OrderGetPayload<{
	select: typeof adminRecentOrderSelect;
}>;

export type AdminDashboardSnapshot = {
	products: {
		total: number;
		active: number;
		inactive: number;
		lowStockVariants: number;
	};
	orders: {
		total: number;
		statusCounts: Partial<Record<OrderStatus, number>>;
	};
	customers: {
		total: number;
	};
	revenueTotal: Prisma.Decimal | null;
	recentOrders: AdminRecentOrderRecord[];
};

function moneyToNumber(value: Prisma.Decimal | null) {
	return value?.toDecimalPlaces(2).toNumber() ?? 0;
}

function getCustomerName(order: AdminRecentOrderRecord) {
	const fullName = [
		order.customerFirstName.trim(),
		order.customerLastName.trim(),
	]
		.filter(Boolean)
		.join(" ");

	return fullName.length > 0 ? fullName : order.customerEmail;
}

export function mapAdminDashboard(snapshot: AdminDashboardSnapshot) {
	const { statusCounts } = snapshot.orders;

	return {
		products: snapshot.products,
		orders: {
			total: snapshot.orders.total,
			pendingPayment: statusCounts.PENDING_PAYMENT ?? 0,
			processing: statusCounts.PROCESSING ?? 0,
			shipped: statusCounts.SHIPPED ?? 0,
			delivered: statusCounts.DELIVERED ?? 0,
		},
		customers: snapshot.customers,
		revenue: {
			total: moneyToNumber(snapshot.revenueTotal),
			currency: ADMIN_DASHBOARD_CURRENCY,
		},
		recentOrders: snapshot.recentOrders.map((order) => ({
			orderNumber: order.orderNumber,
			customerName: getCustomerName(order),
			status: order.status,
			paymentStatus: order.paymentStatus,
			total: moneyToNumber(order.total),
			currency: order.currency,
			createdAt: order.createdAt.toISOString(),
		})),
	};
}
