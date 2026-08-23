import { z } from "zod";

const requiredText = (label: string, maximum: number) =>
	z
		.string()
		.trim()
		.min(1, `${label} is required.`)
		.max(maximum, `${label} must be ${maximum} characters or fewer.`);

const optionalText = (maximum: number) =>
	z.string().trim().max(maximum, `Use ${maximum} characters or fewer.`);

const themeColor = z
	.string()
	.trim()
	.regex(/^#[0-9a-f]{6}$/i, "Use a six-digit hex color, such as #F2EFE9.");

const positiveMoney = (label: string) =>
	z
		.string()
		.trim()
		.min(1, `${label} is required.`)
		.refine(
			(value) => Number.isFinite(Number(value)) && Number(value) > 0,
			`${label} must be greater than zero.`,
		);

const optionalMoney = z
	.string()
	.trim()
	.refine(
		(value) =>
			value.length === 0 ||
			(Number.isFinite(Number(value)) && Number(value) > 0),
		"Compare-at price must be greater than zero.",
	);

const nonNegativeInteger = z
	.string()
	.trim()
	.min(1, "Stock is required.")
	.refine(
		(value) =>
			/^\d+$/.test(value) &&
			Number.isSafeInteger(Number(value)) &&
			Number(value) >= 0,
		"Stock must be a non-negative whole number.",
	);

const variantSchema = z.object({
	id: z.string().optional(),
	format: z.enum(["BOTTLE", "REFILL"]),
	volumeMl: z.enum(["50", "100", "150"]),
	price: positiveMoney("Price"),
	compareAtPrice: optionalMoney,
	sku: requiredText("SKU", 120),
	stock: nonNegativeInteger,
});

const imageSchema = z.object({
	id: z.string().optional(),
	url: requiredText("Image URL", 2_000).refine(
		(value) =>
			value.startsWith("/") ||
			value.startsWith("https://") ||
			value.startsWith("http://"),
		"Use a root-relative path or an absolute HTTP URL.",
	),
	alt: requiredText("Image alt text", 300),
	position: z.number().int().nonnegative(),
	isPrimary: z.boolean(),
	imageType: z.enum(["MAIN", "GALLERY", "HOVER", "REFILL"]),
	storageKey: z.string().optional(),
	mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]).optional(),
	sizeBytes: z.number().int().positive().optional(),
});

const noteSchema = z.object({
	noteId: requiredText("Note", 200),
	name: z.string().optional(),
	isActive: z.boolean().optional(),
	type: z.enum(["TOP", "HEART", "BASE"]),
	position: z.number().int().nonnegative(),
});

export const adminProductFormSchema = z
	.object({
		name: requiredText("Name", 160),
		slug: requiredText("Slug", 120).regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Use lowercase letters, numbers, and single hyphens only.",
		),
		subtitle: optionalText(220),
		description: requiredText("Description", 10_000),
		fragranceFamily: requiredText("Fragrance family", 120),
		concentration: requiredText("Concentration", 120),
		gender: optionalText(80),
		longevity: optionalText(160),
		season: z.array(requiredText("Season", 80)).max(12),
		occasion: z.array(requiredText("Occasion", 80)).max(12),
		isActive: z.boolean(),
		isFeatured: z.boolean(),
		isNew: z.boolean(),
		isLimited: z.boolean(),
		themeMode: z.enum(["DEFAULT", "PRESET", "CUSTOM"]),
		themePreset: z.enum(["MIDNIGHT", "FOREST", "BURGUNDY"]),
		themeBackground: themeColor,
		themeSurface: themeColor,
		themeAccent: themeColor,
		variants: z.array(variantSchema).min(1, "Add at least one variant."),
		images: z.array(imageSchema).max(30),
		notes: z.array(noteSchema).max(60),
		collectionIds: z.array(z.string().min(1)).max(30),
	})
	.superRefine((values, context) => {
		const combinations = new Map<string, number>();
		const skus = new Map<string, number>();

		values.variants.forEach((variant, index) => {
			if (variant.format === "BOTTLE" && variant.volumeMl === "150") {
				context.addIssue({
					code: "custom",
					message: "Bottle variants cannot use 150 ml.",
					path: ["variants", index, "volumeMl"],
				});
			}

			const combination = `${variant.format}:${variant.volumeMl}`;
			if (combinations.has(combination)) {
				context.addIssue({
					code: "custom",
					message: "This format and size already exists.",
					path: ["variants", index, "volumeMl"],
				});
			}
			combinations.set(combination, index);

			const normalizedSku = variant.sku.trim().toUpperCase();
			if (skus.has(normalizedSku)) {
				context.addIssue({
					code: "custom",
					message: "SKU must be unique within this product.",
					path: ["variants", index, "sku"],
				});
			}
			skus.set(normalizedSku, index);

			if (
				variant.compareAtPrice.trim().length > 0 &&
				Number(variant.compareAtPrice) <= Number(variant.price)
			) {
				context.addIssue({
					code: "custom",
					message: "Compare-at price must be greater than price.",
					path: ["variants", index, "compareAtPrice"],
				});
			}
		});

		const primaryCount = values.images.filter(
			(image) => image.isPrimary,
		).length;
		if (values.images.length > 0 && primaryCount !== 1) {
			context.addIssue({
				code: "custom",
				message: "Choose exactly one primary image.",
				path: ["images"],
			});
		}

		const noteKeys = new Set<string>();
		values.notes.forEach((note, index) => {
			const key = `${note.type}:${note.noteId}`;
			if (noteKeys.has(key)) {
				context.addIssue({
					code: "custom",
					message: "This note is already selected in this group.",
					path: ["notes", index, "noteId"],
				});
			}
			noteKeys.add(key);
		});

		if (new Set(values.collectionIds).size !== values.collectionIds.length) {
			context.addIssue({
				code: "custom",
				message: "Collections cannot be selected more than once.",
				path: ["collectionIds"],
			});
		}
	});

export type AdminProductFormValues = z.infer<
	typeof adminProductFormSchema
>;
