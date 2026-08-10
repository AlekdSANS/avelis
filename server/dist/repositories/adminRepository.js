import { ADMIN_DASHBOARD_CURRENCY, ADMIN_RECENT_ORDERS_LIMIT, ADMIN_REVENUE_EXCLUDED_STATUSES, LOW_STOCK_THRESHOLD, } from "../config/admin.js";
import { UserRole } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
import { adminRecentOrderSelect, } from "../utils/adminMapper.js";
export async function getAdminDashboardSnapshot() {
    const [productTotal, activeProducts, lowStockVariants, orderTotal, orderStatusGroups, customerTotal, revenue, recentOrders,] = await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.productVariant.count({
            where: {
                stock: {
                    gt: 0,
                    lte: LOW_STOCK_THRESHOLD,
                },
            },
        }),
        prisma.order.count(),
        prisma.order.groupBy({
            by: ["status"],
            _count: {
                _all: true,
            },
        }),
        prisma.user.count({
            where: {
                role: UserRole.USER,
            },
        }),
        prisma.order.aggregate({
            where: {
                currency: ADMIN_DASHBOARD_CURRENCY,
                status: {
                    notIn: [...ADMIN_REVENUE_EXCLUDED_STATUSES],
                },
            },
            _sum: {
                total: true,
            },
        }),
        prisma.order.findMany({
            select: adminRecentOrderSelect,
            orderBy: [{ createdAt: "desc" }, { id: "desc" }],
            take: ADMIN_RECENT_ORDERS_LIMIT,
        }),
    ]);
    const statusCounts = Object.fromEntries(orderStatusGroups.map((group) => [group.status, group._count._all]));
    return {
        products: {
            total: productTotal,
            active: activeProducts,
            inactive: productTotal - activeProducts,
            lowStockVariants,
        },
        orders: {
            total: orderTotal,
            statusCounts,
        },
        customers: {
            total: customerTotal,
        },
        revenueTotal: revenue._sum.total,
        recentOrders,
    };
}
//# sourceMappingURL=adminRepository.js.map