import { Prisma } from "../generated/prisma/client.js";
import type { ShippingMethod } from "../generated/prisma/enums.js";

export const ORDER_CURRENCY = "PLN" as const;
export const INITIAL_ORDER_STATUS = "PENDING_PAYMENT" as const;
export const INITIAL_PAYMENT_STATUS = "PENDING" as const;

const SHIPPING_PRICE_BY_METHOD = {
	STANDARD: "19.00",
	EXPRESS: "39.00",
} as const satisfies Record<ShippingMethod, string>;

export function getShippingPrice(method: ShippingMethod) {
	return new Prisma.Decimal(SHIPPING_PRICE_BY_METHOD[method]).toDecimalPlaces(2);
}
