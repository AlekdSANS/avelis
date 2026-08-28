import { useState } from "react";
import type { ImgHTMLAttributes } from "react";

import { COLLECTION_PLACEHOLDER_IMAGE } from "../../../constants/imagePlaceholders";
import { resolvePublicAssetUrl } from "../../../services/apiClient";

type FallbackImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src"
> & {
  fallbackSrc?: string;
  src?: string | null;
};

function normalizeImageSource(src: string | null | undefined) {
  const normalized = src?.trim();

  return normalized ? normalized : undefined;
}

export function FallbackImage({
  alt,
  fallbackSrc = COLLECTION_PLACEHOLDER_IMAGE,
  onError,
  src,
  ...props
}: FallbackImageProps) {
  const source = normalizeImageSource(src);
  const fallback =
    normalizeImageSource(fallbackSrc) ?? COLLECTION_PLACEHOLDER_IMAGE;
  const [failedSource, setFailedSource] = useState<string>();
  const shouldUseFallback = source === undefined || failedSource === source;
  const currentSource = shouldUseFallback ? fallback : source;

  return (
    <img
      alt={alt}
      onError={(event) => {
        onError?.(event);
        if (!shouldUseFallback && source) {
          setFailedSource(source);
        }
      }}
      src={resolvePublicAssetUrl(currentSource)}
      {...props}
    />
  );
}
