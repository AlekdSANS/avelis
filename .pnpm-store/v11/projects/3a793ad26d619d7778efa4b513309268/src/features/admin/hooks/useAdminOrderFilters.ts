import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import type {
	AdminOrderListParams,
	AdminOrderSort,
} from "../../../types/adminOrder";
import type {
	OrderStatus,
	PaymentMethod,
	PaymentStatus,
	ShippingMethod,
} from "../../../types/order";

const orderStatuses = new Set<OrderStatus>([
	"PENDING_PAYMENT",
	"CONFIRMED",
	"PROCESSING",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED",
	"REFUNDED",
]);
const paymentStatuses = new Set<PaymentStatus>([
	"PENDING",
	"PAID",
	"FAILED",
	"REFUNDED",
	"CANCELLED",
]);
const paymentMethods = new Set<PaymentMethod>([
	"CARD",
	"BLIK",
	"CASH_ON_DELIVERY",
]);
const shippingMethods = new Set<ShippingMethod>(["STANDARD", "EXPRESS"]);
const sorts = new Set<AdminOrderSort>([
	"newest",
	"oldest",
	"total-asc",
	"total-desc",
]);

function parsePage(value: string | null) {
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseNonNegativeNumber(value: string | null) {
	if (value === null || value.trim() === "") return undefined;
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function parseEnum<T extends string>(
	value: string | null,
	values: Set<T>,
) {
	return value !== null && values.has(value as T) ? (value as T) : undefined;
}

export function useAdminOrderFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const filters: AdminOrderListParams = {
		search: searchParams.get("search") ?? undefined,
		status: parseEnum(searchParams.get("status"), orderStatuses),
		paymentStatus: parseEnum(
			searchParams.get("paymentStatus"),
			paymentStatuses,
		),
		paymentMethod: parseEnum(
			searchParams.get("paymentMethod"),
			paymentMethods,
		),
		shippingMethod: parseEnum(
			searchParams.get("shippingMethod"),
			shippingMethods,
		),
		dateFrom: searchParams.get("dateFrom") ?? undefined,
		dateTo: searchParams.get("dateTo") ?? undefined,
		minTotal: parseNonNegativeNumber(searchParams.get("minTotal")),
		maxTotal: parseNonNegativeNumber(searchParams.get("maxTotal")),
		sort:
			parseEnum(searchParams.get("sort"), sorts) ??
			"newest",
		page: parsePage(searchParams.get("page")),
		limit: 20,
	};

	const updateFilters = useCallback(
		(
			updates: Partial<
				Record<keyof AdminOrderListParams, string | number | undefined>
			>,
			options?: { replace?: boolean; resetPage?: boolean },
		) => {
			setSearchParams(
				(current) => {
					const next = new URLSearchParams(current);

					Object.entries(updates).forEach(([key, value]) => {
						if (
							value === undefined ||
							value === "" ||
							(key === "sort" && value === "newest") ||
							(key === "page" && value === 1)
						) {
							next.delete(key);
						} else {
							next.set(key, String(value));
						}
					});

					if (options?.resetPage !== false) {
						next.delete("page");
					}

					return next;
				},
				{ replace: options?.replace ?? false },
			);
		},
		[setSearchParams],
	);

	const clearFilters = useCallback(() => {
		setSearchParams((current) => {
			const next = new URLSearchParams();
			const sort = current.get("sort");

			if (sort !== null && sort !== "newest") {
				next.set("sort", sort);
			}

			return next;
		});
	}, [setSearchParams]);

	const setPage = useCallback(
		(page: number) => updateFilters({ page }, { resetPage: false }),
		[updateFilters],
	);

	return {
		filters,
		updateFilters,
		clearFilters,
		setPage,
	};
}
