import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

const fallbackImage = "/images/placeholders/product_placeholder.png";

type ProductImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export function ProductImage({
  alt,
  fallbackSrc = fallbackImage,
  onError,
  src,
  ...props
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const currentSrc = failedSrc === src ? fallbackSrc : src;

  return (
    <img
      alt={alt}
      onError={(event) => {
        onError?.(event);
        if (currentSrc !== fallbackSrc && typeof src === "string") {
          setFailedSrc(src);
        }
      }}
      src={currentSrc}
      {...props}
    />
  );
}
