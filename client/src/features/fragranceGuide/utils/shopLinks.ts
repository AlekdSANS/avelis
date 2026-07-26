import type { ProductVariantFormat } from "../../../types/product";

export type GuideShopFilters = {
  collection?: string;
  concentration?: string;
  family?: string;
  format?: ProductVariantFormat;
  note?: string;
};

export function buildGuideShopHref(filters: GuideShopFilters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `/shop?${query}` : "/shop";
}
