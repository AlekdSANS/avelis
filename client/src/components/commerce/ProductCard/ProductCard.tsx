import styles from "./ProductCard.module.scss";
import { ArrowUpRight, Heart, Star, X } from "lucide-react";
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
import { useCart } from "../../../features/cart/hooks/useCart";
import {
  trackSelectItem,
  trackWishlistChange,
} from "../../../services/analytics";

export type ProductCardProps = {
  className?: string;
  isWishlisted?: boolean;
  matchingVariants?: ProductVariant[];
  itemIndex?: number;
  itemListId?: string;
  itemListName?: string;
  onWishlistToggle?: (productId: string) => void;
  product: Product;
};

export function ProductCard({
  className,
  isWishlisted = false,
  matchingVariants,
  itemIndex,
  itemListId,
  itemListName,
  onWishlistToggle,
  product,
}: ProductCardProps) {
  const cart = useCart();
  const displayedVariants = matchingVariants ?? product.variants;
  const cheapestVariant = getCheapestVariant(displayedVariants);
  const quickAddVariants = [...displayedVariants].sort(
    (left, right) =>
      left.format.localeCompare(right.format) || left.volumeMl - right.volumeMl,
  );
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [bagStatus, setBagStatus] = useState("");
  const hasPurchasableVariant = quickAddVariants.some((variant) => {
    const cartQuantity =
      cart.items.find((item) => item.variantId === variant.id)?.quantity ?? 0;
    return variant.stock > cartQuantity;
  });
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
  const trackSelection = () => {
    if (itemListId && itemListName) {
      trackSelectItem(product, {
        itemListId,
        itemListName,
        itemIndex,
      });
    }
  };
  const handleWishlistToggle = () => {
    if (!onWishlistToggle) {
      return;
    }

    onWishlistToggle(product.id);
    trackWishlistChange(
      isWishlisted ? "remove" : "add",
      product,
      cheapestVariant,
    );
  };
  const handleQuickAdd = (variant: ProductVariant) => {
    const cartQuantity =
      cart.items.find((item) => item.variantId === variant.id)?.quantity ?? 0;

    if (variant.stock <= cartQuantity) {
      return;
    }

    cart.addItem({ product, quantity: 1, variant });
    setBagStatus(
      `${product.name}, ${variant.volumeMl} ml ${
        variant.format === "BOTTLE" ? "bottle" : "refill"
      } added to your bag.`,
    );
    setQuickAddOpen(false);
  };

  return (
    <article className={[styles.card, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.media}>
        <Link
          aria-label={`View ${product.name}`}
          className={styles.imageLink}
          onClick={trackSelection}
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
          onClick={handleWishlistToggle}
          variant="soft"
        >
          <Heart aria-hidden="true" fill={isWishlisted ? "currentColor" : "none"} />
        </IconButton>

        <div
          className={styles.quickAdd}
          data-open={quickAddOpen ? "true" : "false"}
          id={`quick-add-${product.id}`}
        >
          {quickAddOpen ? (
            <div
              aria-label={`Choose a format of ${product.name} to add to your bag`}
              className={styles.quickAddPanel}
              role="group"
            >
              <div className={styles.quickAddHeader}>
                <span>Choose format</span>
                <button
                  aria-label={`Close ${product.name} format choices`}
                  onClick={() => setQuickAddOpen(false)}
                  type="button"
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <div className={styles.quickAddOptions}>
                {quickAddVariants.map((variant) => {
                  const cartQuantity =
                    cart.items.find((item) => item.variantId === variant.id)
                      ?.quantity ?? 0;
                  const unavailable = variant.stock <= cartQuantity;

                  return (
                    <button
                      aria-label={`Add ${product.name} ${
                        variant.format === "BOTTLE" ? "bottle" : "refill"
                      }, ${variant.volumeMl} milliliters to bag`}
                      className={styles.quickAddOption}
                      disabled={unavailable}
                      key={variant.id}
                      onClick={() => handleQuickAdd(variant)}
                      type="button"
                    >
                      <span>
                        {variant.format === "BOTTLE" ? "Bottle" : "Refill"}
                        <small>{variant.volumeMl} ml</small>
                      </span>
                      <Price value={variant.price} />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <button
              aria-controls={`quick-add-${product.id}`}
              aria-expanded="false"
              className={styles.quickAddTrigger}
              disabled={!hasPurchasableVariant}
              onClick={() => {
                setBagStatus("");
                setQuickAddOpen(true);
              }}
              type="button"
            >
              {hasPurchasableVariant
                ? bagStatus
                  ? "Added to bag"
                  : "Add to bag"
                : "Unavailable"}
            </button>
          )}
        </div>
        <span aria-live="polite" className={styles.visuallyHidden}>
          {bagStatus}
        </span>
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
            <Link onClick={trackSelection} to={`/products/${product.slug}`}>
              {product.name}
            </Link>
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
          <Link
            className={styles.viewLink}
            onClick={trackSelection}
            to={`/products/${product.slug}`}
          >
            View fragrance
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
