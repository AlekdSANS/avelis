export declare function getAdminDashboard(): Promise<{
    data: {
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
            status: import("../generated/prisma/enums.js").OrderStatus;
            paymentStatus: import("../generated/prisma/enums.js").PaymentStatus;
            total: number;
            currency: string;
            createdAt: string;
        }[];
    };
}>;
//# sourceMappingURL=adminService.d.ts.map