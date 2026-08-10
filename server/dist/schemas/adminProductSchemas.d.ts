import { z } from "zod";
export declare const adminProductListQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<{
        active: "active";
        all: "all";
        featured: "featured";
        inactive: "inactive";
        limited: "limited";
        new: "new";
    }>>;
    family: z.ZodOptional<z.ZodString>;
    concentration: z.ZodOptional<z.ZodString>;
    format: z.ZodDefault<z.ZodEnum<{
        BOTTLE: "BOTTLE";
        REFILL: "REFILL";
        all: "all";
    }>>;
    collection: z.ZodOptional<z.ZodString>;
    stock: z.ZodDefault<z.ZodEnum<{
        all: "all";
        "in-stock": "in-stock";
        "low-stock": "low-stock";
        "out-of-stock": "out-of-stock";
    }>>;
    sort: z.ZodDefault<z.ZodEnum<{
        "name-asc": "name-asc";
        "name-desc": "name-desc";
        newest: "newest";
        oldest: "oldest";
        "price-asc": "price-asc";
        "price-desc": "price-desc";
        "stock-asc": "stock-asc";
        "stock-desc": "stock-desc";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strict>;
export declare const adminProductCreateSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>;
    subtitle: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>>;
    description: z.ZodString;
    fragranceFamily: z.ZodString;
    concentration: z.ZodString;
    gender: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>>;
    longevity: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>>;
    season: z.ZodDefault<z.ZodArray<z.ZodString>>;
    occasion: z.ZodDefault<z.ZodArray<z.ZodString>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    isNew: z.ZodDefault<z.ZodBoolean>;
    isLimited: z.ZodDefault<z.ZodBoolean>;
    variants: z.ZodArray<z.ZodObject<{
        format: z.ZodEnum<{
            BOTTLE: "BOTTLE";
            REFILL: "REFILL";
        }>;
        volumeMl: z.ZodNumber;
        price: z.ZodNumber;
        compareAtPrice: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        stock: z.ZodNumber;
    }, z.core.$strict>>;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodString;
        position: z.ZodNumber;
        isPrimary: z.ZodBoolean;
        imageType: z.ZodEnum<{
            GALLERY: "GALLERY";
            HOVER: "HOVER";
            MAIN: "MAIN";
            REFILL: "REFILL";
        }>;
        storageKey: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
        }>>;
        sizeBytes: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strict>>>;
    notes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        noteId: z.ZodString;
        type: z.ZodEnum<{
            BASE: "BASE";
            HEART: "HEART";
            TOP: "TOP";
        }>;
        position: z.ZodNumber;
    }, z.core.$strict>>>;
    collectionIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const adminProductUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>, z.ZodString>>;
    subtitle: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    fragranceFamily: z.ZodOptional<z.ZodString>;
    concentration: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    longevity: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodNull]>>;
    season: z.ZodOptional<z.ZodArray<z.ZodString>>;
    occasion: z.ZodOptional<z.ZodArray<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isNew: z.ZodOptional<z.ZodBoolean>;
    isLimited: z.ZodOptional<z.ZodBoolean>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
        format: z.ZodEnum<{
            BOTTLE: "BOTTLE";
            REFILL: "REFILL";
        }>;
        volumeMl: z.ZodNumber;
        price: z.ZodNumber;
        compareAtPrice: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        sku: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        stock: z.ZodNumber;
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        alt: z.ZodString;
        position: z.ZodNumber;
        isPrimary: z.ZodBoolean;
        imageType: z.ZodEnum<{
            GALLERY: "GALLERY";
            HOVER: "HOVER";
            MAIN: "MAIN";
            REFILL: "REFILL";
        }>;
        storageKey: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodEnum<{
            "image/jpeg": "image/jpeg";
            "image/png": "image/png";
            "image/webp": "image/webp";
        }>>;
        sizeBytes: z.ZodOptional<z.ZodNumber>;
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>>>;
    notes: z.ZodOptional<z.ZodArray<z.ZodObject<{
        noteId: z.ZodString;
        type: z.ZodEnum<{
            BASE: "BASE";
            HEART: "HEART";
            TOP: "TOP";
        }>;
        position: z.ZodNumber;
    }, z.core.$strict>>>;
    collectionIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const adminProductStatusSchema: z.ZodObject<{
    isActive: z.ZodOptional<z.ZodBoolean>;
    isFeatured: z.ZodOptional<z.ZodBoolean>;
    isNew: z.ZodOptional<z.ZodBoolean>;
    isLimited: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
export type AdminProductListQuery = z.infer<typeof adminProductListQuerySchema>;
export type AdminProductCreateInput = z.infer<typeof adminProductCreateSchema>;
export type AdminProductUpdateInput = z.infer<typeof adminProductUpdateSchema>;
export type AdminProductStatusInput = z.infer<typeof adminProductStatusSchema>;
//# sourceMappingURL=adminProductSchemas.d.ts.map