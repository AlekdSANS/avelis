import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { productService } from "../../../services/productService";

const RECENT_KEY = "avelis-recently-viewed";
const RECENT_LIMIT = 6;

export function useRecentlyViewed(currentSlug: string) {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    if (!currentSlug) {
      return;
    }

    let nextRecentSlugs: string[] = [];

    try {
      const stored = window.localStorage.getItem(RECENT_KEY);
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      const slugs = Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === "string")
        : [];

      nextRecentSlugs = slugs
        .filter((slug) => slug !== currentSlug)
        .slice(0, 4);

      const nextStoredSlugs = [
        currentSlug,
        ...slugs.filter((slug) => slug !== currentSlug),
      ].slice(0, RECENT_LIMIT);
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(nextStoredSlugs));
    } catch {
      nextRecentSlugs = [];
    }

    const frame = window.requestAnimationFrame(() => setRecentSlugs(nextRecentSlugs));
    return () => window.cancelAnimationFrame(frame);
  }, [currentSlug]);

  const queries = useQueries({
    queries: recentSlugs.map((slug) => ({
      queryKey: ["products", "detail", slug],
      queryFn: ({ signal }: { signal: AbortSignal }) =>
        productService.getProductBySlug(slug, { signal }),
      staleTime: 5 * 60_000,
    })),
  });

  return {
    isLoading: queries.some((query) => query.isLoading),
    products: queries
      .map((query) => query.data)
      .filter((product): product is NonNullable<typeof product> => Boolean(product)),
  };
}
