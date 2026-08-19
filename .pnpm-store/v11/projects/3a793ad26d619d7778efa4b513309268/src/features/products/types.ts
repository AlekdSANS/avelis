import type { ProductVariantFormat } from "../../types/product";

export type ProductSort =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating";

export type ShopFilters = {
  search: string;
  families: string[];
  seasons: string[];
  concentrations: string[];
  formats: ProductVariantFormat[];
  volumes: number[];
  collections: string[];
  notes: string[];
  lovedOnly: boolean;
  inStockOnly: boolean;
  minPrice?: number;
  maxPrice?: number;
};

export type FilterKey =
  | "families"
  | "seasons"
  | "concentrations"
  | "formats"
  | "volumes"
  | "collections"
  | "notes";

export const defaultShopFilters: ShopFilters = {
  search: "",
  families: [],
  seasons: [],
  concentrations: [],
  formats: [],
  volumes: [],
  collections: [],
  notes: [],
  lovedOnly: false,
  inStockOnly: false,
};

export const productSortOptions: { label: string; value: ProductSort }[] = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Rating", value: "rating" },
];

export function getActiveFilterCount(filters: ShopFilters) {
  return (
    filters.families.length +
    filters.seasons.length +
    filters.concentrations.length +
    filters.formats.length +
    filters.volumes.length +
    filters.collections.length +
    filters.notes.length +
    Number(Boolean(filters.search)) +
    Number(filters.lovedOnly) +
    Number(filters.inStockOnly) +
    Number(filters.minPrice !== undefined || filters.maxPrice !== undefined)
  );
}
