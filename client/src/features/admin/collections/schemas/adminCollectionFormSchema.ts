import { z } from "zod";

export function createCollectionSlug(value: string) {
	return value
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/['’]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

const optionalUrl = z
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
	);

export const adminCollectionFormSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, "Collection name is required.")
			.max(160),
		slug: z
			.string()
			.trim()
			.min(1, "Collection slug is required.")
			.max(120)
			.regex(
				/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
				"Use lowercase letters, numbers and single hyphens only.",
			),
		eyebrow: z.string().trim().max(120),
		shortDescription: z.string().trim().max(320),
		description: z
			.string()
			.trim()
			.min(1, "Collection story is required.")
			.max(10_000),
		heroImageUrl: optionalUrl,
		cardImageUrl: optionalUrl,
		mobileImageUrl: optionalUrl,
		accentColor: z
			.string()
			.trim()
			.refine(
				(value) => value.length === 0 || /^#[0-9a-f]{6}$/i.test(value),
				"Use a six-digit hex color.",
			),
		status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
		isFeatured: z.boolean(),
		sortOrder: z.number().int().min(-10_000).max(10_000),
		seoTitle: z.string().trim().max(160),
		seoDescription: z.string().trim().max(320),
		productIds: z.array(z.string()).max(200),
	})
	.superRefine((values, context) => {
		if (new Set(values.productIds).size !== values.productIds.length) {
			context.addIssue({
				code: "custom",
				path: ["productIds"],
				message: "A product can only be assigned once.",
			});
		}

		if (values.status !== "PUBLISHED") return;

		if (!values.heroImageUrl && !values.cardImageUrl) {
			context.addIssue({
				code: "custom",
				path: ["heroImageUrl"],
				message: "Add a hero or card image before publishing.",
			});
		}
		if (values.productIds.length === 0) {
			context.addIssue({
				code: "custom",
				path: ["productIds"],
				message: "Assign at least one product before publishing.",
			});
		}
	});

export type AdminCollectionFormValues = z.infer<
	typeof adminCollectionFormSchema
>;
