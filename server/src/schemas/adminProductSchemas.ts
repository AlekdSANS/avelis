import { z } from "zod";
import {
	ADMIN_PRODUCT_DEFAULT_PAGE_SIZE,
	ADMIN_PRODUCT_MAX_PAGE_SIZE,
	ADMIN_PRODUCT_VOLUME_BY_FORMAT,
} from "../config/adminProduct.js";
import { imageStorage } from "../storage/index.js";

const productFormatSchema = z.enum(["BOTTLE", "REFILL"]);
const productImageTypeSchema = z.enum(["MAIN", "GALLERY", "HOVER", "REFILL"]);
const fragranceNoteTypeSchema = z.enum(["TOP", "HEART", "BASE"]);

function normalizeSlug(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const slugSchema = z
	.string()
	.trim()
	.min(1, "Slug is required")
	.max(120)
	.transform(normalizeSlug)
	.pipe(
		z
			.string()
			.min(1, "Slug is required")
			.regex(
				/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				"Slug must contain lowercase letters, numbers, and hyphens only",
			),
	);

const optionalNullableText = (max: number) =>
	z
		.union([z.string().trim().min(1).max(max), z.null()])
		.optional();

const productCoreCreateSchema = z
	.object({
		name: z.string().trim().min(1, "Name is required").max(160),
		slug: slugSchema,
		subtitle: optionalNullableText(220).default(null),
		description: z.string().trim().min(1, "Description is required").max(10_000),
		fragranceFamily: z
			.string()
			.trim()
			.min(1, "Fragrance family is required")
			.max(120),
		concentration: z
			.string()
			.trim()
			.min(1, "Concentration is required")
			.max(120),
		gender: optionalNullableText(80).default(null),
		longevity: optionalNullableText(160).default(null),
		season: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
		occasion: z.array(z.string().trim().min(1).max(80)).max(12).default([]),
		isActive: z.boolean().default(true),
		isFeatured: z.boolean().default(false),
		isNew: z.boolean().default(false),
		isLimited: z.boolean().default(false),
	})
	.strict();

const variantFields = {
	format: productFormatSchema,
	volumeMl: z.number().int().positive(),
	price: z.number().positive().max(99_999_999),
	compareAtPrice: z.number().positive().max(99_999_999).nullable().default(null),
	sku: z
		.string()
		.trim()
		.min(1, "SKU is required")
		.max(120)
		.transform((value) => value.toUpperCase()),
	stock: z.number().int().nonnegative().max(10_000_000),
} as const;

function validateVariant(
	variant: {
		format: keyof typeof ADMIN_PRODUCT_VOLUME_BY_FORMAT;
		volumeMl: number;
		price: number;
		compareAtPrice: number | null;
	},
	context: z.RefinementCtx,
) {
	const allowedVolumes = ADMIN_PRODUCT_VOLUME_BY_FORMAT[variant.format];

	if (!allowedVolumes.includes(variant.volumeMl as never)) {
		context.addIssue({
			code: "custom",
			message: `${variant.volumeMl} ml is not available for ${variant.format.toLowerCase()} products`,
			path: ["volumeMl"],
		});
	}

	if (
		variant.compareAtPrice !== null &&
		variant.compareAtPrice <= variant.price
	) {
		context.addIssue({
			code: "custom",
			message: "Compare-at price must be greater than price",
			path: ["compareAtPrice"],
		});
	}
}

const createVariantSchema = z
	.object(variantFields)
	.strict()
	.superRefine(validateVariant);

const updateVariantSchema = z
	.object({
		id: z.string().trim().min(1).optional(),
		...variantFields,
	})
	.strict()
	.superRefine(validateVariant);

const imageFields = {
	url: z
		.string()
		.trim()
		.min(1, "Image URL is required")
		.max(2_000)
		.refine(
			(value) =>
				value.startsWith("/") ||
				value.startsWith("https://") ||
				value.startsWith("http://"),
			"Image URL must be an absolute URL or root-relative path",
		),
	alt: z.string().trim().min(1, "Image alt text is required").max(300),
	position: z.number().int().nonnegative(),
	isPrimary: z.boolean(),
	imageType: productImageTypeSchema,
	storageKey: z
		.string()
		.trim()
		.regex(/^products\/[0-9a-f-]+\.(?:jpg|png|webp)$/i)
		.optional(),
	mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]).optional(),
	sizeBytes: z.number().int().positive().max(8 * 1024 * 1024).optional(),
} as const;

const createImageSchema = z.object(imageFields).strict();
const updateImageSchema = z
	.object({
		id: z.string().trim().min(1).optional(),
		...imageFields,
	})
	.strict();

const noteRelationSchema = z
	.object({
		noteId: z.string().trim().min(1),
		type: fragranceNoteTypeSchema,
		position: z.number().int().nonnegative(),
	})
	.strict();

function validateVariants(
	variants: ReadonlyArray<{
		format: "BOTTLE" | "REFILL";
		volumeMl: number;
		sku: string;
		id?: string | undefined;
	}>,
	context: z.RefinementCtx,
) {
	const combinations = new Set<string>();
	const skus = new Set<string>();
	const ids = new Set<string>();

	variants.forEach((variant, index) => {
		const combination = `${variant.format}:${variant.volumeMl}`;

		if (combinations.has(combination)) {
			context.addIssue({
				code: "custom",
				message: "Variant format and volume must be unique per product",
				path: ["variants", index, "volumeMl"],
			});
		}
		combinations.add(combination);

		if (skus.has(variant.sku)) {
			context.addIssue({
				code: "custom",
				message: "SKU must be unique within the product",
				path: ["variants", index, "sku"],
			});
		}
		skus.add(variant.sku);

		if (variant.id !== undefined) {
			if (ids.has(variant.id)) {
				context.addIssue({
					code: "custom",
					message: "Variant ID may only appear once",
					path: ["variants", index, "id"],
				});
			}
			ids.add(variant.id);
		}
	});
}

function validateImages(
	images: ReadonlyArray<{
		id?: string | undefined;
		isPrimary: boolean;
		url: string;
		storageKey?: string | undefined;
		mimeType?: string | undefined;
		sizeBytes?: number | undefined;
	}>,
	context: z.RefinementCtx,
) {
	const primaryCount = images.filter((image) => image.isPrimary).length;

	if (images.length > 0 && primaryCount !== 1) {
		context.addIssue({
			code: "custom",
			message: "Exactly one primary image is required when images are provided",
			path: ["images"],
		});
	}

	const ids = new Set<string>();
	images.forEach((image, index) => {
		const managedMetadataCount = [
			image.storageKey,
			image.mimeType,
			image.sizeBytes,
		].filter((value) => value !== undefined).length;

		if (managedMetadataCount !== 0 && managedMetadataCount !== 3) {
			context.addIssue({
				code: "custom",
				message: "Managed image metadata must be provided together",
				path: ["images", index],
			});
		}

		if (
			image.storageKey !== undefined &&
			image.url !== imageStorage.getPublicUrl(image.storageKey)
		) {
			context.addIssue({
				code: "custom",
				message: "Managed image URL must match its storage key",
				path: ["images", index, "url"],
			});
		}

		if (image.id === undefined) {
			return;
		}

		if (ids.has(image.id)) {
			context.addIssue({
				code: "custom",
				message: "Image ID may only appear once",
				path: ["images", index, "id"],
			});
		}
		ids.add(image.id);
	});
}

function validateRelations(
	notes: ReadonlyArray<{ noteId: string; type: string }>,
	collectionIds: readonly string[],
	context: z.RefinementCtx,
) {
	const noteKeys = new Set<string>();
	notes.forEach((note, index) => {
		const key = `${note.noteId}:${note.type}`;
		if (noteKeys.has(key)) {
			context.addIssue({
				code: "custom",
				message: "The same note and pyramid type may only appear once",
				path: ["notes", index],
			});
		}
		noteKeys.add(key);
	});

	if (new Set(collectionIds).size !== collectionIds.length) {
		context.addIssue({
			code: "custom",
			message: "Collection IDs must be unique",
			path: ["collectionIds"],
		});
	}
}

export const adminProductListQuerySchema = z
	.object({
		search: z.string().trim().min(1).max(120).optional(),
		status: z
			.enum(["all", "active", "inactive", "featured", "new", "limited"])
			.default("all"),
		family: z.string().trim().min(1).max(120).optional(),
		concentration: z.string().trim().min(1).max(120).optional(),
		format: z.enum(["all", "BOTTLE", "REFILL"]).default("all"),
		collection: z.string().trim().min(1).max(160).optional(),
		stock: z
			.enum(["all", "in-stock", "low-stock", "out-of-stock"])
			.default("all"),
		sort: z
			.enum([
				"newest",
				"oldest",
				"name-asc",
				"name-desc",
				"price-asc",
				"price-desc",
				"stock-asc",
				"stock-desc",
			])
			.default("newest"),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce
			.number()
			.int()
			.positive()
			.max(ADMIN_PRODUCT_MAX_PAGE_SIZE)
			.default(ADMIN_PRODUCT_DEFAULT_PAGE_SIZE),
	})
	.strict();

export const adminProductCreateSchema = productCoreCreateSchema
	.extend({
		variants: z.array(createVariantSchema).min(1, "At least one variant is required"),
		images: z.array(createImageSchema).max(30).default([]),
		notes: z.array(noteRelationSchema).max(60).default([]),
		collectionIds: z.array(z.string().trim().min(1)).max(30).default([]),
	})
	.strict()
	.superRefine((input, context) => {
		validateVariants(input.variants, context);
		validateImages(input.images, context);
		validateRelations(input.notes, input.collectionIds, context);
	});

const updateCoreShape = {
	name: z.string().trim().min(1).max(160).optional(),
	slug: slugSchema.optional(),
	subtitle: optionalNullableText(220),
	description: z.string().trim().min(1).max(10_000).optional(),
	fragranceFamily: z.string().trim().min(1).max(120).optional(),
	concentration: z.string().trim().min(1).max(120).optional(),
	gender: optionalNullableText(80),
	longevity: optionalNullableText(160),
	season: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
	occasion: z.array(z.string().trim().min(1).max(80)).max(12).optional(),
	isActive: z.boolean().optional(),
	isFeatured: z.boolean().optional(),
	isNew: z.boolean().optional(),
	isLimited: z.boolean().optional(),
} as const;

export const adminProductUpdateSchema = z
	.object({
		...updateCoreShape,
		variants: z
			.array(updateVariantSchema)
			.min(1, "At least one variant is required")
			.optional(),
		images: z.array(updateImageSchema).max(30).optional(),
		notes: z.array(noteRelationSchema).max(60).optional(),
		collectionIds: z.array(z.string().trim().min(1)).max(30).optional(),
	})
	.strict()
	.superRefine((input, context) => {
		if (Object.keys(input).length === 0) {
			context.addIssue({
				code: "custom",
				message: "At least one product field is required",
			});
		}

		if (input.variants !== undefined) {
			validateVariants(input.variants, context);
		}
		if (input.images !== undefined) {
			validateImages(input.images, context);
		}
		if (input.notes !== undefined) {
			validateRelations(input.notes, input.collectionIds ?? [], context);
		} else if (
			input.collectionIds !== undefined &&
			new Set(input.collectionIds).size !== input.collectionIds.length
		) {
			context.addIssue({
				code: "custom",
				message: "Collection IDs must be unique",
				path: ["collectionIds"],
			});
		}
	});

export const adminProductStatusSchema = z
	.object({
		isActive: z.boolean().optional(),
		isFeatured: z.boolean().optional(),
		isNew: z.boolean().optional(),
		isLimited: z.boolean().optional(),
	})
	.strict()
	.refine((input) => Object.keys(input).length > 0, {
		message: "At least one status field is required",
	});

export type AdminProductListQuery = z.infer<
	typeof adminProductListQuerySchema
>;
export type AdminProductCreateInput = z.infer<
	typeof adminProductCreateSchema
>;
export type AdminProductUpdateInput = z.infer<
	typeof adminProductUpdateSchema
>;
export type AdminProductStatusInput = z.infer<
	typeof adminProductStatusSchema
>;
