import { z } from "zod";

export function normalizeCollectionSlug(value: string) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.trim()
		.toLowerCase()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const collectionSlugSchema = z
	.string()
	.trim()
	.min(1, "Collection slug is required")
	.max(120)
	.transform(normalizeCollectionSlug)
	.pipe(
		z
			.string()
			.min(1, "Collection slug is required")
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	);

const nullableText = (max: number) =>
	z.union([z.string().trim().min(1).max(max), z.null()]).optional();

const nullableImageUrlSchema = z
	.union([
		z
			.string()
			.trim()
			.min(1)
			.max(2_000)
			.refine(
				(value) =>
					value.startsWith("/") ||
					value.startsWith("https://") ||
					value.startsWith("http://"),
				"Image URL must be absolute or root-relative",
			),
		z.null(),
	])
	.optional();

const nullableAccentColorSchema = z
	.union([
		z
			.string()
			.trim()
			.regex(/^#[0-9a-f]{6}$/i, "Accent color must be a six-digit hex color"),
		z.null(),
	])
	.optional();

const productIdsSchema = z
	.array(z.string().trim().min(1))
	.max(200)
	.refine((ids) => new Set(ids).size === ids.length, {
		message: "Product IDs must be unique",
	});

const collectionFields = {
	name: z.string().trim().min(1, "Collection name is required").max(160),
	slug: collectionSlugSchema.optional(),
	eyebrow: nullableText(120),
	shortDescription: nullableText(320),
	description: z
		.string()
		.trim()
		.min(1, "Collection description is required")
		.max(10_000),
	heroImageUrl: nullableImageUrlSchema,
	cardImageUrl: nullableImageUrlSchema,
	mobileImageUrl: nullableImageUrlSchema,
	accentColor: nullableAccentColorSchema,
	status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
	isFeatured: z.boolean(),
	sortOrder: z.number().int().min(-10_000).max(10_000),
	seoTitle: nullableText(160),
	seoDescription: nullableText(320),
	productIds: productIdsSchema,
} as const;

export const adminCollectionListQuerySchema = z
	.object({
		search: z.string().trim().min(1).max(120).optional(),
		status: z
			.enum(["all", "DRAFT", "PUBLISHED", "ARCHIVED"])
			.default("all"),
		featured: z.enum(["all", "true", "false"]).default("all"),
		sort: z
			.enum(["newest", "oldest", "name-asc", "name-desc", "sort-order"])
			.default("newest"),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
	})
	.strict();

export const adminCollectionCreateSchema = z
	.object({
		...collectionFields,
		status: collectionFields.status.default("DRAFT"),
		isFeatured: collectionFields.isFeatured.default(false),
		sortOrder: collectionFields.sortOrder.default(0),
		productIds: collectionFields.productIds.default([]),
	})
	.strict();

export const adminCollectionUpdateSchema = z
	.object({
		name: collectionFields.name.optional(),
		slug: collectionSlugSchema.optional(),
		eyebrow: collectionFields.eyebrow,
		shortDescription: collectionFields.shortDescription,
		description: collectionFields.description.optional(),
		heroImageUrl: collectionFields.heroImageUrl,
		cardImageUrl: collectionFields.cardImageUrl,
		mobileImageUrl: collectionFields.mobileImageUrl,
		accentColor: collectionFields.accentColor,
		status: collectionFields.status.optional(),
		isFeatured: collectionFields.isFeatured.optional(),
		sortOrder: collectionFields.sortOrder.optional(),
		seoTitle: collectionFields.seoTitle,
		seoDescription: collectionFields.seoDescription,
		productIds: collectionFields.productIds.optional(),
	})
	.strict()
	.refine((input) => Object.keys(input).length > 0, {
		message: "At least one collection field is required",
	});

export type AdminCollectionListQuery = z.infer<
	typeof adminCollectionListQuerySchema
>;
export type AdminCollectionCreateInput = z.infer<
	typeof adminCollectionCreateSchema
>;
export type AdminCollectionUpdateInput = z.infer<
	typeof adminCollectionUpdateSchema
>;
