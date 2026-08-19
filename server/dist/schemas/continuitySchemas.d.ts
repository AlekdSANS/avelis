import { z } from "zod";
export declare const continuityMergeSchema: z.ZodObject<{
    cartItems: z.ZodDefault<z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strict>>>;
    wishlistProductIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const cartReplaceSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strict>>;
}, z.core.$strict>;
export declare const wishlistReplaceSchema: z.ZodObject<{
    productIds: z.ZodArray<z.ZodString>;
}, z.core.$strict>;
export type ContinuityMergeInput = z.infer<typeof continuityMergeSchema>;
export type CartReplaceInput = z.infer<typeof cartReplaceSchema>;
export type WishlistReplaceInput = z.infer<typeof wishlistReplaceSchema>;
//# sourceMappingURL=continuitySchemas.d.ts.map