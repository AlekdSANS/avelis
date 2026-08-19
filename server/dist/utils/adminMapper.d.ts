import type { Prisma } from "../generated/prisma/client.js";
import type { OrderStatus } from "../generated/prisma/enums.js";
export declare const adminRecentOrderSelect: {
    orderNumber: true;
    customerFirstName: true;
    customerLastName: true;
    customerEmail: true;
    status: true;
    paymentStatus: true;
    total: true;
    currency: true;
    createdAt: true;
};
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
export declare function mapAdminDashboard(snapshot: AdminDashboardSnapshot): {
    products: {
        total: number;
        active: number;
        inactive: number;
        lowStockVariants: number;
    };
    orders: {
        total: number;
        pendingPayment: number;
        processing: number;
        shipped: number;
        delivered: number;
    };
    customers: {
        total: number;
    };
    revenue: {
        total: number;
        currency: "EUR";
    };
    recentOrders: {
        orderNumber: string;
        customerName: string;
        status: OrderStatus;
        paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
        total: number;
        currency: string;
        createdAt: string;
    }[];
};
//# sourceMappingURL=adminMapper.d.ts.map