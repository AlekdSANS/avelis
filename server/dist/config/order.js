import { Prisma } from "../generated/prisma/client.js";
export const ORDER_CURRENCY = "EUR";
export const INITIAL_ORDER_STATUS = "PENDING_PAYMENT";
export const INITIAL_PAYMENT_STATUS = "PENDING";
const SHIPPING_PRICE_BY_METHOD = {
    STANDARD: "19.00",
    EXPRESS: "39.00",
};
export function getShippingPrice(method) {
    return new Prisma.Decimal(SHIPPING_PRICE_BY_METHOD[method]).toDecimalPlaces(2);
}
//# sourceMappingURL=order.js.map