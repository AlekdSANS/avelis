import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import type { ProductVariantFormat } from "../../../types/product";
import {
  defaultShopFilters,
  type FilterKey,
  type ProductSort,
  type ShopFilters,
} from "../types";

const arrayParamNames: Record<FilterKey, string> = {
  families: "family",
  seasons: "season",
  concentrations: "concentration",
  formats: "format",
  volumes: "volume",
  collections: "collection",
  notes: "note",
};

const validSorts = new Set<ProductSort>([
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "rating",
]);

function parseList(value: string | null) {
  return value?.split(",").filter(Boolean) ?? [];
}

function parseNumber(value: string | null) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ShopFilters>(() => {
    const formats = parseList(searchParams.get("format")).filter(
      (format): format is ProductVariantFormat =>
        format === "BOTTLE" || format === "REFILL",
    );

    return {
      ...defaultShopFilters,
      search: searchParams.get("search") ?? "",
      families: parseList(searchParams.get("family")),
      seasons: parseList(searchParams.get("season")),
      concentrations: parseList(searchParams.get("concentration")),
      formats,
      volumes: parseList(searchParams.get("volume"))
        .map(Number)
        .filter((volume) => [50, 100, 150].includes(volume)),
      collections: parseList(searchParams.get("collection")),
      notes: parseList(searchParams.get("note")),
      lovedOnly: searchParams.get("loved") === "true",
      inStockOnly: searchParams.get("availability") === "in-stock",
      minPrice: parseNumber(searchParams.get("minPrice")),
      maxPrice: parseNumber(searchParams.get("maxPrice")),
    };
  }, [searchParams]);

  const sortParam = searchParams.get("sort") as ProductSort | null;
  const sort = sortParam && validSorts.has(sortParam) ? sortParam : "featured";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const updateParams = useCallback(
    (
      updates: Record<string, string | number | boolean | undefined>,
      options: { replace?: boolean; resetPage?: boolean } = {},
    ) => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);

          Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === "" || value === false) {
              next.delete(key);
            } else {
              next.set(key, String(value));
            }
          });

          if (options.resetPage !== false) {
            next.delete("page");
          }

          return next;
        },
        { replace: options.replace ?? false },
      );
    },
    [setSearchParams],
  );

  const toggleFilter = useCallback(
    (key: FilterKey, value: string | number) => {
      const values = filters[key] as (string | number)[];
      const nextValues = values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value];

      updateParams({
        [arrayParamNames[key]]: nextValues.length > 0 ? nextValues.join(",") : undefined,
      });
    },
    [filters, updateParams],
  );

  const setSearch = useCallback(
    (search: string) => updateParams({ search }, { replace: true }),
    [updateParams],
  );

  const setSort = useCallback(
    (nextSort: ProductSort) =>
      updateParams(
        { sort: nextSort === "featured" ? undefined : nextSort },
        { resetPage: false },
      ),
    [updateParams],
  );

  const setPage = useCallback(
    (nextPage: number) =>
      updateParams(
        { page: nextPage > 1 ? nextPage : undefined },
        { resetPage: false },
      ),
    [updateParams],
  );

  const clearAll = useCallback(() => {
    setSearchParams((current) => {
      const next = new URLSearchParams();
      const currentSort = current.get("sort");
      if (currentSort) {
        next.set("sort", currentSort);
      }
      return next;
    });
  }, [setSearchParams]);

  const removeFilter = useCallback(
    (key: FilterKey, value: string | number) => toggleFilter(key, value),
    [toggleFilter],
  );

  return {
    filters,
    sort,
    page,
    toggleFilter,
    setSearch,
    setSort,
    setPage,
    setAvailability: (checked: boolean) =>
      updateParams({ availability: checked ? "in-stock" : undefined }),
    setPriceRange: (minPrice?: number, maxPrice?: number) =>
      updateParams({ minPrice, maxPrice }),
    clearAll,
    removeFilter,
    setLovedOnly: (checked: boolean) =>
      updateParams({ loved: checked ? "true" : undefined }),
  };
}
