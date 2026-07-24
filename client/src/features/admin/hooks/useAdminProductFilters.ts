import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import type {
	AdminProductListParams,
	AdminProductSort,
	AdminProductStatusFilter,
	AdminProductStockFilter,
} from "../../../types/adminProduct";
import type { ProductVariantFormat } from "../../../types/product";

const validStatuses = new Set<AdminProductStatusFilter>([
	"all",
	"active",
	"inactive",
	"featured",
	"new",
	"limited",
]);
const validStocks = new Set<AdminProductStockFilter>([
	"all",
	"in-stock",
	"low-stock",
	"out-of-stock",
]);
const validSorts = new Set<AdminProductSort>([
	"newest",
	"oldest",
	"name-asc",
	"name-desc",
	"price-asc",
	"price-desc",
	"stock-asc",
	"stock-desc",
]);

function parsePage(value: string | null) {
	const parsed = Number(value);
	return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseStatus(value: string | null): AdminProductStatusFilter {
	return value !== null &&
		validStatuses.has(value as AdminProductStatusFilter)
		? (value as AdminProductStatusFilter)
		: "all";
}

function parseStock(value: string | null): AdminProductStockFilter {
	return value !== null && validStocks.has(value as AdminProductStockFilter)
		? (value as AdminProductStockFilter)
		: "all";
}

function parseSort(value: string | null): AdminProductSort {
	return value !== null && validSorts.has(value as AdminProductSort)
		? (value as AdminProductSort)
		: "newest";
}

function parseFormat(
	value: string | null,
): "all" | ProductVariantFormat {
	return value === "BOTTLE" || value === "REFILL" ? value : "all";
}

export function useAdminProductFilters() {
	const [searchParams, setSearchParams] = useSearchParams();
	const filters: AdminProductListParams = {
		search: searchParams.get("search") ?? undefined,
		status: parseStatus(searchParams.get("status")),
		family: searchParams.get("family") ?? undefined,
		concentration: searchParams.get("concentration") ?? undefined,
		format: parseFormat(searchParams.get("format")),
		collection: searchParams.get("collection") ?? undefined,
		stock: parseStock(searchParams.get("stock")),
		sort: parseSort(searchParams.get("sort")),
		page: parsePage(searchParams.get("page")),
		limit: 20,
	};

	const updateFilters = useCallback(
		(
			updates: Partial<Record<keyof AdminProductListParams, string | number>>,
			options?: { replace?: boolean; resetPage?: boolean },
		) => {
			setSearchParams(
				(current) => {
					const next = new URLSearchParams(current);

					Object.entries(updates).forEach(([key, value]) => {
						if (
							value === undefined ||
							value === "" ||
							(key === "status" && value === "all") ||
							(key === "format" && value === "all") ||
							(key === "stock" && value === "all") ||
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
