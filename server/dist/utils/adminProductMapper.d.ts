import type { Prisma } from "../generated/prisma/client.js";
import type { ProductRecord } from "./productMapper.js";
export declare const adminProductListSelect: {
    id: true;
    slug: true;
    name: true;
    fragranceFamily: true;
    concentration: true;
    isActive: true;
    isFeatured: true;
    isNew: true;
    isLimited: true;
    updatedAt: true;
    variants: {
        select: {
            price: true;
            stock: true;
        };
    };
    images: {
        select: {
            url: true;
            alt: true;
        };
        orderBy: ({
            isPrimary: "desc";
            position?: never;
            createdAt?: never;
        } | {
            isPrimary?: never;
            position: "asc";
            createdAt?: never;
        } | {
            isPrimary?: never;
            position?: never;
            createdAt: "asc";
        })[];
        take: number;
    };
    _count: {
        select: {
            collections: true;
        };
    };
};
export type AdminProductListRecord = Prisma.ProductGetPayload<{
    select: typeof adminProductListSelect;
}>;
export declare function mapAdminProductSummary(product: AdminProductListRecord): {
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
export declare function mapAdminProductDetail(product: ProductRecord): {
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
//# sourceMappingURL=adminProductMapper.d.ts.map