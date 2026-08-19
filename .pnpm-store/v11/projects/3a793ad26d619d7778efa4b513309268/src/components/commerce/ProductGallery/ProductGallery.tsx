import styles from "./ProductGallery.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";

import { ProductImage } from "../../../features/products/components/ProductImage";
import type { ProductImage as ProductImageType } from "../../../types/product";
import { IconButton } from "../../ui/IconButton/IconButton";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{
    id: number;
    x: number;
    y: number;
    isSwiping: boolean;
  } | undefined>(undefined);

  const selectedSafeIndex = Math.min(
    selectedIndex,
    Math.max(images.length - 1, 0),
  );
  const selectedImage = images[selectedSafeIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  const selectImage = useCallback(
    (nextIndex: number) => {
      setSelectedIndex(
        Math.min(Math.max(nextIndex, 0), Math.max(images.length - 1, 0)),
      );
    },
    [images.length],
  );

  const showPreviousImage = useCallback(() => {
    selectImage(selectedSafeIndex - 1);
  }, [selectImage, selectedSafeIndex]);

  const showNextImage = useCallback(() => {
    selectImage(selectedSafeIndex + 1);
  }, [selectImage, selectedSafeIndex]);

  useEffect(() => {
    const activeThumbnail =
      thumbnailsRef.current?.querySelector<HTMLButtonElement>(
        `[data-gallery-index="${selectedSafeIndex}"]`,
      );

    activeThumbnail?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedSafeIndex]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!hasMultipleImages || event.pointerType === "mouse") {
      return;
    }

    pointerStartRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      isSwiping: false,
    };
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;

    if (
      !start.isSwiping &&
      Math.abs(deltaX) > 12 &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.4
    ) {
      start.isSwiping = true;
    }

    if (start.isSwiping) {
      event.preventDefault();
    }
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStartRef.current;
    if (!start || start.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    pointerStartRef.current = undefined;

    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.4) {
      return;
    }

    if (deltaX < 0) {
      showNextImage();
    } else {
      showPreviousImage();
    }
  };

  return (
    <div className={[styles.gallery, className ?? ""].filter(Boolean).join(" ")}>
      <div
        className={styles.main}
        onPointerCancel={() => {
          pointerStartRef.current = undefined;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
      >
        <ProductImage
          alt={selectedImage?.alt ?? `${productName} fragrance`}
          className={styles.mainImage}
          fetchPriority="high"
          key={selectedImage?.id ?? "fallback"}
          src={selectedImage?.url}
        />
      </div>

      {hasMultipleImages ? (
        <>
          <div
            aria-label={`${productName} image gallery`}
            className={styles.thumbnails}
            ref={thumbnailsRef}
          >
            {images.map((image, index) => (
              <button
                aria-label={`Show ${productName} image ${index + 1}`}
                aria-pressed={index === selectedSafeIndex}
                className={index === selectedSafeIndex ? styles.selected : ""}
                data-gallery-index={index}
                key={image.id}
                onClick={() => selectImage(index)}
                type="button"
              >
                <ProductImage
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  src={image.url}
                />
              </button>
            ))}
          </div>

          <div
            aria-label="Product image pagination"
            className={styles.pagination}
            role="group"
          >
            <IconButton
              aria-label="Previous product image"
              className={styles.arrow}
              disabled={selectedSafeIndex === 0}
              onClick={showPreviousImage}
              variant="plain"
            >
              <ChevronLeft aria-hidden="true" />
            </IconButton>

            <div className={styles.dots}>
              {images.map((image, index) => (
                <button
                  aria-label={`View image ${index + 1}`}
                  aria-current={index === selectedSafeIndex ? "true" : undefined}
                  className={index === selectedSafeIndex ? styles.activeDot : ""}
                  key={image.id}
                  onClick={() => selectImage(index)}
                  type="button"
                >
                  <span />
                </button>
              ))}
            </div>

            <IconButton
              aria-label="Next product image"
              className={styles.arrow}
              disabled={selectedSafeIndex === images.length - 1}
              onClick={showNextImage}
              variant="plain"
            >
              <ChevronRight aria-hidden="true" />
            </IconButton>
          </div>
        </>
      ) : null}
    </div>
  );
}
