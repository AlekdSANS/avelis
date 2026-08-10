import { z } from "zod";
export declare const adminNoteListQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        inactive: "inactive";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strict>;
export declare const adminNoteCreateSchema: z.ZodObject<{
    name: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strict>;
export declare const adminNoteUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export type AdminNoteListQuery = z.infer<typeof adminNoteListQuerySchema>;
export type AdminNoteCreateInput = z.infer<typeof adminNoteCreateSchema>;
export type AdminNoteUpdateInput = z.infer<typeof adminNoteUpdateSchema>;
//# sourceMappingURL=adminNoteSchemas.d.ts.map