import { useEffect, useState } from "react";

import { productBySlug } from "../data/products";
import type { Product } from "../../../types/product";

const RECENT_KEY = "avelis-recently-viewed";
const RECENT_LIMIT = 6;

export function useRecentlyViewed(currentSlug: string) {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!currentSlug) {
      return;
    }

    let nextProducts: Product[] = [];

    try {
      const stored = window.localStorage.getItem(RECENT_KEY);
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      const slugs = Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];

      nextProducts = slugs
        .filter((slug) => slug !== currentSlug)
        .map((slug) => productBySlug.get(slug))
        .filter((product): product is Product => Boolean(product))
        .slice(0, 4);

      const nextSlugs = [
        currentSlug,
        ...slugs.filter((slug) => slug !== currentSlug),
      ].slice(0, RECENT_LIMIT);
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(nextSlugs));
    } catch {
      nextProducts = [];
    }

    const frame = window.requestAnimationFrame(() => setRecentProducts(nextProducts));
    return () => window.cancelAnimationFrame(frame);
  }, [currentSlug]);

  return recentProducts;
}
