import type {
	AdminProductCreateInput,
	AdminProductDetail,
	AdminProductUpdateInput,
} from "../../../../types/adminProduct";
import type { AdminProductFormValues } from "../schemas/adminProductFormSchema";
import { productFormDefaultValues } from "../types";

const noteTypeRank = { TOP: 0, HEART: 1, BASE: 2 } as const;
const formatRank = { BOTTLE: 0, REFILL: 1 } as const;

export function createProductSlug(value: string) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function mapProductToForm(
	product: AdminProductDetail,
): AdminProductFormValues {
	return {
		...productFormDefaultValues,
		name: product.name,
		slug: product.slug,
		subtitle: product.subtitle ?? "",
		description: product.description,
		fragranceFamily: product.fragranceFamily,
		concentration: product.concentration,
		gender: product.gender ?? "",
		longevity: product.longevity ?? "",
		season: [...product.season],
		occasion: [...product.occasion],
		isActive: product.isActive,
		isFeatured: product.isFeatured,
		isNew: product.isNew,
		isLimited: product.isLimited,
		themeMode: product.themeMode,
		themePreset: product.themePreset ?? "MIDNIGHT",
		themeBackground:
			product.themeBackground ?? productFormDefaultValues.themeBackground,
		themeSurface: product.themeSurface ?? productFormDefaultValues.themeSurface,
		themeAccent: product.themeAccent ?? productFormDefaultValues.themeAccent,
		variants: [...product.variants]
			.sort(
				(left, right) =>
					formatRank[left.format] - formatRank[right.format] ||
					left.volumeMl - right.volumeMl,
			)
			.map((variant) => ({
				id: variant.id,
				format: variant.format,
				volumeMl: String(variant.volumeMl) as "50" | "100" | "150",
				price: String(variant.price),
				compareAtPrice:
					variant.compareAtPrice === null
						? ""
						: String(variant.compareAtPrice),
				sku: variant.sku,
				stock: String(variant.stock),
			})),
		images: [...product.images]
			.sort((left, right) => left.position - right.position)
			.map((image, position) => ({
				id: image.id,
				url: image.url,
				...(image.storageKey === null
					? {}
					: { storageKey: image.storageKey }),
				...(image.mimeType === null
					? {}
					: {
							mimeType: image.mimeType as
								| "image/jpeg"
								| "image/png"
								| "image/webp",
						}),
				...(image.sizeBytes === null
					? {}
					: { sizeBytes: image.sizeBytes }),
				alt: image.alt,
				position,
				isPrimary: image.isPrimary,
				imageType: image.imageType,
			})),
		notes: [...product.notes]
			.sort(
				(left, right) =>
					noteTypeRank[left.type] - noteTypeRank[right.type] ||
					left.position - right.position,
			)
			.map((note) => ({
				noteId: note.noteId,
				name: note.name,
				isActive: note.isActive,
				type: note.type,
				position: note.position,
			})),
		collectionIds: product.collections.map((collection) => collection.id),
	};
}

function nullableText(value: string) {
	const normalized = value.trim();
	return normalized.length === 0 ? null : normalized;
}

function mapCommonProductPayload(values: AdminProductFormValues) {
	const notePositions = { TOP: 0, HEART: 0, BASE: 0 };

	return {
		name: values.name.trim(),
		slug: createProductSlug(values.slug),
		subtitle: nullableText(values.subtitle),
		description: values.description.trim(),
		fragranceFamily: values.fragranceFamily.trim(),
		concentration: values.concentration.trim(),
		gender: nullableText(values.gender),
		longevity: nullableText(values.longevity),
		season: [...new Set(values.season.map((value) => value.trim()))],
		occasion: [...new Set(values.occasion.map((value) => value.trim()))],
		isActive: values.isActive,
		isFeatured: values.isFeatured,
		isNew: values.isNew,
		isLimited: values.isLimited,
		themeMode: values.themeMode,
		themePreset: values.themeMode === "PRESET" ? values.themePreset : null,
		themeBackground:
			values.themeMode === "CUSTOM"
				? values.themeBackground.toUpperCase()
				: null,
		themeSurface:
			values.themeMode === "CUSTOM" ? values.themeSurface.toUpperCase() : null,
		themeAccent:
			values.themeMode === "CUSTOM" ? values.themeAccent.toUpperCase() : null,
		variants: values.variants.map((variant) => ({
			...(variant.id === undefined ? {} : { id: variant.id }),
			format: variant.format,
			volumeMl: Number(variant.volumeMl),
			price: Number(variant.price),
			compareAtPrice:
				variant.compareAtPrice.trim().length === 0
					? null
					: Number(variant.compareAtPrice),
			sku: variant.sku.trim().toUpperCase(),
			stock: Number(variant.stock),
		})),
		images: values.images.map((image, position) => ({
			...(image.id === undefined ? {} : { id: image.id }),
			url: image.url.trim(),
			...(image.storageKey === undefined
				? {}
				: { storageKey: image.storageKey }),
			...(image.mimeType === undefined
				? {}
				: { mimeType: image.mimeType }),
			...(image.sizeBytes === undefined
				? {}
				: { sizeBytes: image.sizeBytes }),
			alt: image.alt.trim(),
			position,
			isPrimary: image.isPrimary,
			imageType: image.imageType,
		})),
		notes: [...values.notes]
			.sort(
				(left, right) =>
					noteTypeRank[left.type] - noteTypeRank[right.type] ||
					left.position - right.position,
			)
			.map((note) => ({
				noteId: note.noteId,
				type: note.type,
				position: notePositions[note.type]++,
			})),
		collectionIds: [...new Set(values.collectionIds)],
	};
}

export function mapFormToCreatePayload(
	values: AdminProductFormValues,
): AdminProductCreateInput {
	const common = mapCommonProductPayload(values);

	return {
		...common,
		variants: common.variants.map((variant) => ({
			format: variant.format,
			volumeMl: variant.volumeMl,
			price: variant.price,
			compareAtPrice: variant.compareAtPrice,
			sku: variant.sku,
			stock: variant.stock,
		})),
		images: common.images.map((image) => ({
			url: image.url,
			...(image.storageKey === undefined
				? {}
				: { storageKey: image.storageKey }),
			...(image.mimeType === undefined
				? {}
				: { mimeType: image.mimeType }),
			...(image.sizeBytes === undefined
				? {}
				: { sizeBytes: image.sizeBytes }),
			alt: image.alt,
			position: image.position,
			isPrimary: image.isPrimary,
			imageType: image.imageType,
		})),
	};
}

export function mapFormToUpdatePayload(
	values: AdminProductFormValues,
): AdminProductUpdateInput {
	return mapCommonProductPayload(values);
}
