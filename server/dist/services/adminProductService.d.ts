import type { AdminProductCreateInput, AdminProductListQuery, AdminProductStatusInput, AdminProductUpdateInput } from "../schemas/adminProductSchemas.js";
export declare function listAdminProducts(query: AdminProductListQuery): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        fragranceFamily: string;
        concentration: string;
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        primaryImage: {
            alt: string;
            url: string;
        } | null;
        startingPrice: number | null;
        variantCount: number;
        totalStock: number;
        lowStockVariantCount: number;
        outOfStockVariantCount: number;
        collectionCount: number;
        updatedAt: string;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function getAdminProduct(id: string): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        subtitle: string | null;
        description: string;
        fragranceFamily: string;
        concentration: string;
        gender: string | null;
        longevity: string | null;
        season: string[];
        occasion: string[];
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        images: {
            id: string;
            url: string;
            storageKey: string | null;
            mimeType: string | null;
            sizeBytes: number | null;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        notes: {
            noteId: string;
            name: string;
            isActive: boolean;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            id: string;
            slug: string;
            name: string;
            isActive: boolean;
        }[];
        createdAt: string;
        updatedAt: string;
    };
}>;
export declare function listAdminProductReferenceNotes(): Promise<{
    data: {
        id: string;
        isActive: boolean;
        name: string;
    }[];
}>;
export declare function listAdminProductReferenceCollections(): Promise<{
    data: {
        id: string;
        name: string;
        slug: string;
        isActive: boolean;
    }[];
}>;
export declare function setAdminProductStatus(id: string, input: AdminProductStatusInput): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        fragranceFamily: string;
        concentration: string;
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        primaryImage: {
            alt: string;
            url: string;
        } | null;
        startingPrice: number | null;
        variantCount: number;
        totalStock: number;
        lowStockVariantCount: number;
        outOfStockVariantCount: number;
        collectionCount: number;
        updatedAt: string;
    };
}>;
export declare function softDeleteAdminProduct(id: string): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        fragranceFamily: string;
        concentration: string;
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        primaryImage: {
            alt: string;
            url: string;
        } | null;
        startingPrice: number | null;
        variantCount: number;
        totalStock: number;
        lowStockVariantCount: number;
        outOfStockVariantCount: number;
        collectionCount: number;
        updatedAt: string;
    };
    message: string;
}>;
export declare function createAdminProduct(input: AdminProductCreateInput): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        subtitle: string | null;
        description: string;
        fragranceFamily: string;
        concentration: string;
        gender: string | null;
        longevity: string | null;
        season: string[];
        occasion: string[];
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        images: {
            id: string;
            url: string;
            storageKey: string | null;
            mimeType: string | null;
            sizeBytes: number | null;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        notes: {
            noteId: string;
            name: string;
            isActive: boolean;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            id: string;
            slug: string;
            name: string;
            isActive: boolean;
        }[];
        createdAt: string;
        updatedAt: string;
    };
}>;
/**
 * Nested update contract for Part 2B:
 * omitted arrays are preserved; provided arrays fully replace membership.
 * Variant/image rows with a valid ID are updated in place, rows without an ID
 * are created, and omitted existing rows are removed within one transaction.
 */
export declare function updateAdminProduct(id: string, input: AdminProductUpdateInput): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        subtitle: string | null;
        description: string;
        fragranceFamily: string;
        concentration: string;
        gender: string | null;
        longevity: string | null;
        season: string[];
        occasion: string[];
        isActive: boolean;
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        images: {
            id: string;
            url: string;
            storageKey: string | null;
            mimeType: string | null;
            sizeBytes: number | null;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        notes: {
            noteId: string;
            name: string;
            isActive: boolean;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            id: string;
            slug: string;
            name: string;
            isActive: boolean;
        }[];
        createdAt: string;
        updatedAt: string;
    };
}>;
//# sourceMappingURL=adminProductService.d.ts.map