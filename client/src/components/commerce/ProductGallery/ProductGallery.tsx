import styles from "./ProductGallery.module.scss";
import { useState } from "react";

import { ProductImage } from "../../../features/products/components/ProductImage";
import type { ProductImage as ProductImageType } from "../../../types/product";

type ProductGalleryProps = {
  className?: string;
  images: ProductImageType[];
  productName: string;
};

export function ProductGallery({
  className,
  images,
  productName,
}: ProductGalleryProps) {
  const [selectedId, setSelectedId] = useState(images[0]?.id);

  const selectedImage =
    images.find((image) => image.id === selectedId) ?? images[0];

  return (
    <div className={[styles.gallery, className ?? ""].filter(Boolean).join(" ")}>
      <div className={styles.main}>
        <ProductImage
          alt={selectedImage?.alt ?? `${productName} fragrance`}
          fetchPriority="high"
          src={selectedImage?.url}
        />
      </div>

      {images.length > 1 ? (
        <div aria-label={`${productName} image gallery`} className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              aria-label={`Show ${productName} image ${index + 1}`}
              aria-pressed={image.id === selectedImage?.id}
              className={image.id === selectedImage?.id ? styles.selected : ""}
              key={image.id}
              onClick={() => setSelectedId(image.id)}
              type="button"
            >
              <ProductImage alt="" aria-hidden="true" loading="lazy" src={image.url} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
