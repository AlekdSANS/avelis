import { z } from "zod";

export const adminNoteFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(1, "Note name is required.")
		.max(120, "Use 120 characters or fewer."),
	isActive: z.boolean(),
});

export type AdminNoteFormValues = z.infer<typeof adminNoteFormSchema>;
