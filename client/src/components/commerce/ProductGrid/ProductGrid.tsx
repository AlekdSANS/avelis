import styles from "./ProductGrid.module.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Product, ProductVariant } from "../../../types/product";
import { trackViewItemList } from "../../../services/analytics";
import { Button } from "../../ui/Button/Button";
import { Skeleton } from "../../ui/Skeleton/Skeleton";
import { ProductCard } from "../ProductCard/ProductCard";

export type ProductGridItem = {
  product: Product;
  variants?: ProductVariant[];
};

type ProductGridProps = {
  className?: string;
  emptyDescription?: string;
  emptyLabel?: string;
  emptyTitle?: string;
  errorMessage?: string;
  itemListId?: string;
  itemListName?: string;
  listDataReady?: boolean;
  items: ProductGridItem[];
  onRetry?: () => void;
  onWishlistToggle?: (productId: string) => void;
  status?: "ready" | "loading" | "error";
  wishlist?: Set<string>;
};

export function ProductGrid({
  className,
  emptyDescription = "Remove a filter or search for another note, family, or composition.",
  emptyLabel = "No exact match",
  emptyTitle = "Try a wider fragrance profile.",
  errorMessage = "The fragrance catalogue could not be shown.",
  itemListId,
  itemListName,
  listDataReady = true,
  items,
  onRetry,
  onWishlistToggle,
  status = "ready",
  wishlist = new Set(),
}: ProductGridProps) {
  const location = useLocation();
  const classes = [styles.grid, className ?? ""].filter(Boolean).join(" ");
  const productSignature = items
    .map(({ product }) => product.slug)
    .join(",");

  useEffect(() => {
    if (
      status !== "ready" ||
      !listDataReady ||
      !itemListId ||
      !itemListName ||
      items.length === 0
    ) {
      return;
    }

    trackViewItemList(
      items.map(({ product }) => product),
      { itemListId, itemListName },
      `${location.key}:${productSignature}`,
    );
  }, [
    itemListId,
    itemListName,
    items,
    listDataReady,
    location.key,
    productSignature,
    status,
  ]);

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
        <p className={styles.stateLabel}>{emptyLabel}</p>
        <h2>{emptyTitle}</h2>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={classes}>
      {items.map(({ product, variants }, index) => (
        <ProductCard
          isWishlisted={wishlist.has(product.id)}
          itemIndex={index}
          itemListId={itemListId}
          itemListName={itemListName}
          key={product.id}
          matchingVariants={variants}
          onWishlistToggle={onWishlistToggle}
          product={product}
        />
      ))}
    </div>
  );
}
