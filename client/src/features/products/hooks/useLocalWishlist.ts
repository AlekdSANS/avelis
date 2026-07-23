import { useCallback, useEffect, useState } from "react";

const WISHLIST_KEY = "avelis-local-wishlist";

export function useLocalWishlist() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  useEffect(() => {
    let nextWishlist = new Set<string>();

    try {
      const stored = window.localStorage.getItem(WISHLIST_KEY);
      const parsed = stored ? (JSON.parse(stored) as unknown) : [];
      if (Array.isArray(parsed)) {
        nextWishlist = new Set(
          parsed.filter((item): item is string => typeof item === "string"),
        );
      }
    } catch {
      nextWishlist = new Set();
    }

    const frame = window.requestAnimationFrame(() => setWishlist(nextWishlist));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }

      try {
        window.localStorage.setItem(WISHLIST_KEY, JSON.stringify([...next]));
      } catch {
        // Local wishlist remains available for the current session.
      }

      return next;
    });
  }, []);

  return { wishlist, toggleWishlist };
}
