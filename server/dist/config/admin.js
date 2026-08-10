import { ORDER_CURRENCY } from "./order.js";
export const LOW_STOCK_THRESHOLD = 5;
export const ADMIN_RECENT_ORDERS_LIMIT = 7;
export const ADMIN_DASHBOARD_CURRENCY = ORDER_CURRENCY;
// Dashboard sales total: placed PLN orders, excluding terminal cancelled/refunded
// orders. This is an operational overview, not accounting-grade recognized revenue.
export const ADMIN_REVENUE_EXCLUDED_STATUSES = [
    "CANCELLED",
    "REFUNDED",
];
//# sourceMappingURL=admin.js.map