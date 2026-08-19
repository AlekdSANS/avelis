import type { ShippingMethod } from "../generated/prisma/enums.js";
export declare const ORDER_CURRENCY: "EUR";
export declare const INITIAL_ORDER_STATUS: "PENDING_PAYMENT";
export declare const INITIAL_PAYMENT_STATUS: "PENDING";
export declare function getShippingPrice(method: ShippingMethod): import("@prisma/client-runtime-utils").Decimal;
//# sourceMappingURL=order.d.ts.map