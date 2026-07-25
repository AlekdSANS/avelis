import { z } from "zod";

export const adminNoteFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Note name is required.")
		.max(120, "Use 120 characters or fewer."),
	isActive: z.boolean(),
});

export const adminCollectionFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Collection name is required.")
		.max(160, "Use 160 characters or fewer."),
	slug: z
		.string()
		.trim()
		.min(1, "Collection slug is required.")
		.max(120, "Use 120 characters or fewer.")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Use lowercase letters, numbers, and single hyphens only.",
		),
	description: z
		.string()
		.trim()
		.min(1, "Collection description is required.")
		.max(2_000, "Use 2,000 characters or fewer."),
	imageUrl: z
		.string()
		.trim()
		.max(2_000, "Use 2,000 characters or fewer.")
		.refine(
			(value) =>
				value.length === 0 ||
				value.startsWith("/") ||
				value.startsWith("https://") ||
				value.startsWith("http://"),
			"Use an absolute image URL or root-relative path.",
		),
	isActive: z.boolean(),
});

export type AdminNoteFormValues = z.infer<typeof adminNoteFormSchema>;
export type AdminCollectionFormValues = z.infer<
	typeof adminCollectionFormSchema
>;
