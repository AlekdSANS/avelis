import { z } from "zod";

export const deleteProductUploadSchema = z.object({
	storageKey: z
		.string()
		.trim()
		.regex(
			/^products\/[0-9a-f-]+\.(?:jpg|png|webp)$/i,
			"Invalid managed product image key",
		),
});

export type DeleteProductUploadInput = z.infer<
	typeof deleteProductUploadSchema
>;
