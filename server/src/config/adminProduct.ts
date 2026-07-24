import type { ProductFormat } from "../generated/prisma/enums.js";

export const ADMIN_PRODUCT_VOLUME_BY_FORMAT = {
	BOTTLE: [50, 100],
	REFILL: [50, 100, 150],
} as const satisfies Record<ProductFormat, readonly number[]>;

export const ADMIN_PRODUCT_DEFAULT_PAGE_SIZE = 20;
export const ADMIN_PRODUCT_MAX_PAGE_SIZE = 100;
