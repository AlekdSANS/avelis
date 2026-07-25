export const ADMIN_ORDER_DEFAULT_PAGE_SIZE = 20;
export const ADMIN_ORDER_MAX_PAGE_SIZE = 100;

/**
 * Cancelling an order does not alter variant stock in this MVP.
 * Inventory corrections remain an explicit future admin operation.
 */
export const ADMIN_ORDER_AUTO_RESTOCK_ON_CANCELLATION = false;
