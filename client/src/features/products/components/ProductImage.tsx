import type { ComponentProps } from "react";

import { FallbackImage } from "../../../components/common/FallbackImage/FallbackImage";
import { PRODUCT_PLACEHOLDER_IMAGE } from "../../../constants/imagePlaceholders";

type ProductImageProps = ComponentProps<typeof FallbackImage>;

export function ProductImage({
  fallbackSrc = PRODUCT_PLACEHOLDER_IMAGE,
  ...props
}: ProductImageProps) {
  return (
    <FallbackImage
      fallbackSrc={fallbackSrc}
      {...props}
    />
  );
}
