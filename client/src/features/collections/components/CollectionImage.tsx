import { useState, type ComponentProps } from "react";
import { COLLECTION_PLACEHOLDER_IMAGE } from "../../../constants/imagePlaceholders";
import { ProductImage } from "../../products/components/ProductImage";
import { resolvePublicAssetUrl } from "../../../services/apiClient";

type CollectionImageProps = Omit<ComponentProps<typeof ProductImage>, "src"> & {
	fallback?: string;
	mobileSrc?: string | null;
	src?: string | null;
};

export function CollectionImage({
	fallback = COLLECTION_PLACEHOLDER_IMAGE,
	mobileSrc,
	onError,
	src,
	...imageProps
}: CollectionImageProps) {
	const normalizedMobileSrc = mobileSrc?.trim() || undefined;
	const [failedMobileSrc, setFailedMobileSrc] = useState<string>();
	const showMobileSource =
		normalizedMobileSrc !== undefined && failedMobileSrc !== normalizedMobileSrc;
	const resolvedMobileSrc = showMobileSource
		? resolvePublicAssetUrl(normalizedMobileSrc)
		: undefined;
	const handleError: ComponentProps<typeof ProductImage>["onError"] = (event) => {
		onError?.(event);

		if (
			resolvedMobileSrc &&
			event.currentTarget.currentSrc ===
				new URL(resolvedMobileSrc, window.location.href).href
		) {
			setFailedMobileSrc(normalizedMobileSrc);
		}
	};

	if (!showMobileSource) {
		return (
			<ProductImage
				{...imageProps}
				fallbackSrc={fallback}
				onError={handleError}
				src={src}
			/>
		);
	}

	return (
		<picture>
			<source
				media="(max-width: 47.99rem)"
				srcSet={resolvedMobileSrc}
			/>
			<ProductImage
				{...imageProps}
				fallbackSrc={fallback}
				onError={handleError}
				src={src}
			/>
		</picture>
	);
}
