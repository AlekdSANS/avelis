import { z } from "zod";

const noteNameSchema = z
	.string()
	.trim()
	.min(1, "Note name is required")
	.max(120)
	.transform((value) => value.replace(/\s+/g, " "));

export const adminNoteListQuerySchema = z
	.object({
		search: z.string().trim().min(1).max(120).optional(),
		status: z.enum(["all", "active", "inactive"]).default("all"),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce.number().int().positive().max(100).default(20),
	})
	.strict();

export const adminNoteCreateSchema = z
	.object({
		name: noteNameSchema,
		isActive: z.boolean().default(true),
	})
	.strict();

export const adminNoteUpdateSchema = z
	.object({
		name: noteNameSchema.optional(),
		isActive: z.boolean().optional(),
	})
	.strict()
	.refine((input) => Object.keys(input).length > 0, {
		message: "At least one note field is required",
	});

export type AdminNoteListQuery = z.infer<typeof adminNoteListQuerySchema>;
export type AdminNoteCreateInput = z.infer<typeof adminNoteCreateSchema>;
export type AdminNoteUpdateInput = z.infer<typeof adminNoteUpdateSchema>;
