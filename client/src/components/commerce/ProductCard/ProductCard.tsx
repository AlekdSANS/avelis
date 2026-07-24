import styles from "./ProductCard.module.scss";
import { ArrowUpRight, Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { ProductImage } from "../../../features/products/components/ProductImage";
import {
  getCheapestVariant,
  getHoverProductImage,
  getPrimaryProductImage,
} from "../../../features/products/utils/productCatalog";
import type { Product, ProductVariant } from "../../../types/product";
import { Badge } from "../../ui/Badge/Badge";
import { IconButton } from "../../ui/IconButton/IconButton";
import { Price } from "../../ui/Price/Price";

export type ProductCardProps = {
  className?: string;
  isWishlisted?: boolean;
  matchingVariants?: ProductVariant[];
  onWishlistToggle?: (productId: string) => void;
  product: Product;
};

export function ProductCard({
  className,
  isWishlisted = false,
  matchingVariants,
  onWishlistToggle,
  product,
}: ProductCardProps) {
  const displayedVariants = matchingVariants ?? product.variants;
  const cheapestVariant = getCheapestVariant(displayedVariants);
  const bottleVolumes = [
    ...new Set(
      product.variants
        .filter((variant) => variant.format === "BOTTLE")
        .map((variant) => variant.volumeMl),
    ),
  ];
  const refillVolumes = [
    ...new Set(
      product.variants
        .filter((variant) => variant.format === "REFILL")
        .map((variant) => variant.volumeMl),
    ),
  ];
  const primaryImage = getPrimaryProductImage(product);
  const secondaryImage = getHoverProductImage(product);
  const [secondaryAvailable, setSecondaryAvailable] = useState(
    secondaryImage.id !== primaryImage.id,
  );
  const ratingLabel =
    product.rating === null
      ? "New"
      : `${product.rating.toFixed(1)} (${product.reviewCount})`;

  return (
    <article className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.media}>
        <Link
          aria-label={`View ${product.name}`}
          className={styles.imageLink}
          to={`/products/${product.slug}`}
        >
          <ProductImage
            alt={primaryImage.alt}
            className={styles.primaryImage}
            loading="lazy"
            src={primaryImage.url}
          />
          {secondaryAvailable ? (
            <ProductImage
              alt=""
              aria-hidden="true"
              className={styles.secondaryImage}
              loading="lazy"
              onError={() => setSecondaryAvailable(false)}
              src={secondaryImage.url}
            />
          ) : null}
        </Link>

        <div className={styles.badges}>
          {product.isNew ? <Badge>New</Badge> : null}
          {product.isLimited ? <Badge tone="dark">Limited</Badge> : null}
          {product.isFeatured ? <Badge>Featured</Badge> : null}
        </div>

        <IconButton
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from local wishlist`
              : `Add ${product.name} to local wishlist`
          }
          aria-pressed={isWishlisted}
          className={styles.wishlist}
          onClick={() => onWishlistToggle?.(product.id)}
          variant="soft"
        >
          <Heart aria-hidden="true" fill={isWishlisted ? "currentColor" : "none"} />
        </IconButton>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span>{product.fragranceFamily}</span>
          <span className={styles.rating}>
            <Star aria-hidden="true" fill="currentColor" />
            {ratingLabel}
          </span>
        </div>

        <div>
          <h3>
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>
          <p className={styles.subtitle}>{product.subtitle}</p>
        </div>

        <div className={styles.formatDetails}>
          {bottleVolumes.length > 0 ? (
            <span>
              {Math.min(...bottleVolumes)}-{Math.max(...bottleVolumes)} ml bottles
            </span>
          ) : null}
          {refillVolumes.length > 0 ? (
            <span>Refills available: {refillVolumes.join(", ")} ml</span>
          ) : null}
        </div>

        <div className={styles.footer}>
          {cheapestVariant ? (
            <Price prefix="From" value={cheapestVariant.price} />
          ) : (
            <span>Currently unavailable</span>
          )}
          <Link className={styles.viewLink} to={`/products/${product.slug}`}>
            View fragrance
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
