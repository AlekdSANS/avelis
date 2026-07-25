import { z } from "zod";

function normalizeSlug(value: string) {
	return value
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
	.transform(normalizeSlug)
	.pipe(
		z
			.string()
			.min(1, "Collection slug is required")
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
	);

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

export const adminCollectionListQuerySchema = z
	.object({
		search: z.string().trim().min(1).max(120).optional(),
		status: z.enum(["all", "active", "inactive"]).default("all"),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
	})
	.strict();

export const adminCollectionCreateSchema = z
	.object({
		name: z.string().trim().min(1, "Collection name is required").max(160),
		slug: collectionSlugSchema,
		description: z
			.string()
			.trim()
			.min(1, "Collection description is required")
			.max(2_000),
		imageUrl: nullableImageUrlSchema.default(null),
		isActive: z.boolean().default(true),
	})
	.strict();

export const adminCollectionUpdateSchema = z
	.object({
		name: z.string().trim().min(1).max(160).optional(),
		slug: collectionSlugSchema.optional(),
		description: z.string().trim().min(1).max(2_000).optional(),
		imageUrl: nullableImageUrlSchema,
		isActive: z.boolean().optional(),
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
