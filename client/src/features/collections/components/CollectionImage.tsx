import type { ComponentProps } from "react";
import { ProductImage } from "../../products/components/ProductImage";
import { resolvePublicAssetUrl } from "../../../services/apiClient";

type CollectionImageProps = Omit<ComponentProps<typeof ProductImage>, "src"> & {
	fallback?: string;
	mobileSrc?: string | null;
	src?: string | null;
};

const FALLBACK_IMAGE = "/images/placeholders/collection_placeholder.png";

export function CollectionImage({
	fallback = FALLBACK_IMAGE,
	mobileSrc,
	src,
	...imageProps
}: CollectionImageProps) {
	const resolvedSrc = src ?? fallback;

	if (!mobileSrc) {
		return <ProductImage {...imageProps} src={resolvedSrc} />;
	}

	return (
		<picture>
			<source
				media="(max-width: 47.99rem)"
				srcSet={resolvePublicAssetUrl(mobileSrc)}
			/>
			<ProductImage {...imageProps} src={resolvedSrc} />
		</picture>
	);
}
