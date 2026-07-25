import { useState } from "react";
import type { ImgHTMLAttributes } from "react";
import { resolvePublicAssetUrl } from "../../../services/apiClient";

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
  const resolvedSrc =
    typeof src === "string" ? resolvePublicAssetUrl(src) : src;
  const currentSrc = failedSrc === src ? fallbackSrc : resolvedSrc;

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
