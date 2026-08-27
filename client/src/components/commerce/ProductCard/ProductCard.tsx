import styles from "./ProductCard.module.scss";
import { ArrowUpRight, Heart, ShoppingBag, Star } from "lucide-react";
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
  itemIndex,
  itemListId,
  itemListName,
  onWishlistToggle,
  product,
}: ProductCardProps) {
  const cart = useCart();
  const bottleVariants = product.variants.filter(
    (variant) => variant.format === "BOTTLE",
  );
  const cheapestVariant = getCheapestVariant(bottleVariants);
  const quickAddVariants = [...bottleVariants].sort(
    (left, right) => left.volumeMl - right.volumeMl,
  );
  const [selectedVariantId, setSelectedVariantId] = useState(
    cheapestVariant?.id,
  );
  const [bagStatus, setBagStatus] = useState("");
  const selectedVariant =
    quickAddVariants.find(
      (variant) => variant.id === selectedVariantId && variant.stock > 0,
    ) ?? cheapestVariant;
  const selectedCartQuantity = selectedVariant
    ? (cart.items.find((item) => item.variantId === selectedVariant.id)
        ?.quantity ?? 0)
    : 0;
  const cannotAddSelectedVariant =
    selectedVariant === undefined ||
    selectedCartQuantity >= selectedVariant.stock;
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
  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariantId(variant.id);
    setBagStatus("");
  };
  const handleAddToBag = () => {
    if (!selectedVariant || cannotAddSelectedVariant) {
      return;
    }

    cart.addItem({ product, quantity: 1, variant: selectedVariant });
    setBagStatus(
      `${product.name}, ${selectedVariant.volumeMl} ml bottle added to your bag.`,
    );
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
          {product.isLimited ? (
            <Badge tone="dark">Limited edition</Badge>
          ) : product.isNew ? (
            <Badge>New</Badge>
          ) : product.isFeatured ? (
            <Badge>Featured</Badge>
          ) : null}
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

        <div className={styles.options}>
          <span className={styles.optionLabel}>Size</span>
          <div
            aria-label={`Choose ${product.name} bottle size`}
            className={styles.variantGrid}
            role="group"
          >
            {quickAddVariants.map((variant) => (
              <button
                aria-label={`Select ${product.name} bottle, ${variant.volumeMl} milliliters`}
                aria-pressed={selectedVariant?.id === variant.id}
                className={styles.variantButton}
                disabled={variant.stock <= 0}
                key={variant.id}
                onClick={() => handleVariantSelect(variant)}
                type="button"
              >
                {variant.volumeMl} ml
              </button>
            ))}
          </div>
        </div>

        <div className={styles.purchase}>
          <div className={styles.actions}>
            <button
              className={styles.addButton}
              disabled={cannotAddSelectedVariant}
              onClick={handleAddToBag}
              type="button"
            >
              {selectedVariant === undefined
                ? (
                    <>
                      <ShoppingBag aria-hidden="true" />
                      <span>Unavailable</span>
                    </>
                  )
                : selectedCartQuantity >= selectedVariant.stock
                  ? (
                      <>
                        <ShoppingBag aria-hidden="true" />
                        <span>Maximum in bag</span>
                      </>
                    )
                  : (
                      <>
                        <span className={styles.addLabel}>
                          <ShoppingBag aria-hidden="true" />
                          <span>Add {selectedVariant.volumeMl} ml to bag</span>
                        </span>
                        <Price
                          className={styles.addPrice}
                          value={selectedVariant.price}
                        />
                      </>
                    )}
            </button>
            <Link
              className={styles.shopButton}
              onClick={trackSelection}
              to={`/products/${product.slug}`}
            >
              View fragrance
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <span aria-live="polite" className={styles.visuallyHidden}>
            {bagStatus}
          </span>
        </div>
      </div>
    </article>
  );
}
