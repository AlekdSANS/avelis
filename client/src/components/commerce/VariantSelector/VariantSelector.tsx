import styles from "./VariantSelector.module.scss";
import type { ProductVariant, ProductVariantFormat } from "../../../types/product";
import { Price } from "../../ui/Price/Price";

type VariantSelectorProps = {
  className?: string;
  onChange: (variant: ProductVariant) => void;
  selectedVariantId?: string;
  variants: ProductVariant[];
};

const formatDetails: Record<
  ProductVariantFormat,
  { description: string; title: string }
> = {
  BOTTLE: {
    title: "Bottle",
    description: "Complete AVELIS perfume bottle",
  },
  REFILL: {
    title: "Refill",
    description: "Refill pouch only — designed for an existing AVELIS bottle",
  },
};

export function VariantSelector({
  className,
  onChange,
  selectedVariantId,
  variants,
}: VariantSelectorProps) {
  return (
    <div className={[styles.selector, className ?? ""].filter(Boolean).join(" ")}>
      {(["BOTTLE", "REFILL"] as const).map((format) => {
        const formatVariants = variants.filter((variant) => variant.format === format);

        if (formatVariants.length === 0) {
          return null;
        }

        return (
          <fieldset className={styles.group} key={format}>
            <legend>
              <span>{formatDetails[format].title}</span>
              <small>{formatDetails[format].description}</small>
            </legend>
            <div className={styles.options}>
              {formatVariants.map((variant) => {
                const isSelected = selectedVariantId === variant.id;
                return (
                  <button
                    aria-pressed={isSelected}
                    className={isSelected ? styles.selected : ""}
                    disabled={variant.stock === 0}
                    key={variant.id}
                    onClick={() => onChange(variant)}
                    type="button"
                  >
                    <span>{variant.volumeMl} ml</span>
                    <Price
                      compareAtPrice={variant.compareAtPrice}
                      value={variant.price}
                    />
                    <small>
                      {variant.stock === 0
                        ? "Out of stock"
                        : variant.stock <= 5
                          ? `Only ${variant.stock} left`
                          : "In stock"}
                    </small>
                  </button>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
