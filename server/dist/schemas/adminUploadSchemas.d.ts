import { z } from "zod";
export declare const deleteProductUploadSchema: z.ZodObject<{
    storageKey: z.ZodString;
}, z.core.$strip>;
export type DeleteProductUploadInput = z.infer<typeof deleteProductUploadSchema>;
//# sourceMappingURL=adminUploadSchemas.d.ts.map