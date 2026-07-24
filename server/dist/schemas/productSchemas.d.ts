import { z } from "zod";
export declare const productListQuerySchema: z.ZodObject<{
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    family: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    season: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    concentration: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    format: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodEnum<{
        BOTTLE: "BOTTLE";
        REFILL: "REFILL";
    }>>>>;
    volume: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodNumber>>>;
    collection: z.ZodPreprocess<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    inStock: z.ZodPreprocess<z.ZodOptional<z.ZodPipe<z.ZodEnum<{
        false: "false";
        true: "true";
    }>, z.ZodTransform<boolean, "false" | "true">>>>;
    minPrice: z.ZodPreprocess<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    maxPrice: z.ZodPreprocess<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sort: z.ZodDefault<z.ZodEnum<{
        featured: "featured";
        newest: "newest";
        "price-asc": "price-asc";
        "price-desc": "price-desc";
        rating: "rating";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const featuredProductsQuerySchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type ProductListQuery = z.infer<typeof productListQuerySchema>;
export type FeaturedProductsQuery = z.infer<typeof featuredProductsQuerySchema>;
//# sourceMappingURL=productSchemas.d.ts.map