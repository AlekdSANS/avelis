import styles from "./ProductGrid.module.scss";
import type { Product, ProductVariant } from "../../../types/product";
import { Button } from "../../ui/Button/Button";
import { Skeleton } from "../../ui/Skeleton/Skeleton";
import { ProductCard } from "../ProductCard/ProductCard";

export type ProductGridItem = {
  product: Product;
  variants?: ProductVariant[];
};

type ProductGridProps = {
  className?: string;
  errorMessage?: string;
  items: ProductGridItem[];
  onRetry?: () => void;
  onWishlistToggle?: (productId: string) => void;
  status?: "ready" | "loading" | "error";
  wishlist?: Set<string>;
};

export function ProductGrid({
  className,
  errorMessage = "The fragrance catalogue could not be shown.",
  items,
  onRetry,
  onWishlistToggle,
  status = "ready",
  wishlist = new Set(),
}: ProductGridProps) {
  const classes = [styles.grid, className ?? ""].filter(Boolean).join(" ");

  if (status === "loading") {
    return (
      <div aria-busy="true" aria-label="Loading fragrances" className={classes}>
        {Array.from({ length: 8 }, (_, index) => (
          <div className={styles.skeletonCard} key={index}>
            <Skeleton className={styles.skeletonImage} />
            <Skeleton className={styles.skeletonLine} />
            <Skeleton className={styles.skeletonTitle} />
            <Skeleton className={styles.skeletonLine} />
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.state} role="alert">
        <p className={styles.stateLabel}>Catalogue unavailable</p>
        <h2>Something interrupted the collection.</h2>
        <p>{errorMessage}</p>
        {onRetry ? <Button onClick={onRetry}>Try again</Button> : null}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.stateLabel}>No exact match</p>
        <h2>Try a wider fragrance profile.</h2>
        <p>Remove a filter or search for another note, family, or composition.</p>
      </div>
    );
  }

  return (
    <div className={classes}>
      {items.map(({ product, variants }) => (
        <ProductCard
          isWishlisted={wishlist.has(product.id)}
          key={product.id}
          matchingVariants={variants}
          onWishlistToggle={onWishlistToggle}
          product={product}
        />
      ))}
    </div>
  );
}
