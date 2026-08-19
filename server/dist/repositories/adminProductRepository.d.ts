import type { Prisma } from "../generated/prisma/client.js";
import type { AdminProductCreateInput, AdminProductListQuery, AdminProductStatusInput, AdminProductUpdateInput } from "../schemas/adminProductSchemas.js";
import { type AdminProductListRecord } from "../utils/adminProductMapper.js";
export declare function buildAdminProductWhere(query: AdminProductListQuery): Prisma.ProductWhereInput;
export declare function countAdminProducts(query: AdminProductListQuery): Prisma.PrismaPromise<number>;
export declare function findAdminProducts(query: AdminProductListQuery): Promise<AdminProductListRecord[]>;
export declare function findAdminProductById(id: string): Prisma.Prisma__ProductClient<{
    backInStockEnabled: boolean;
    collections: {
        collection: {
            accentColor: string | null;
            cardImageUrl: string | null;
            description: string;
            eyebrow: string | null;
            heroImageUrl: string | null;
            id: string;
            name: string;
            shortDescription: string | null;
            slug: string;
            status: import("../generated/prisma/enums.js").CollectionStatus;
        };
    }[];
    concentration: string;
    createdAt: Date;
    description: string;
    fragranceFamily: string;
    gender: string | null;
    id: string;
    images: {
        alt: string;
        id: string;
        imageType: import("../generated/prisma/enums.js").ProductImageType;
        isPrimary: boolean;
        mimeType: string | null;
        position: number;
        sizeBytes: number | null;
        storageKey: string | null;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    lowStockThreshold: number;
    name: string;
    notes: {
        note: {
            id: string;
            isActive: boolean;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
    sampleAvailable: boolean;
    samplePrice: import("@prisma/client-runtime-utils").Decimal | null;
    season: string[];
    slug: string;
    subtitle: string | null;
    updatedAt: Date;
    variants: {
        compareAtPrice: import("@prisma/client-runtime-utils").Decimal | null;
        format: import("../generated/prisma/enums.js").ProductFormat;
        id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        sku: string;
        stock: number;
        volumeMl: number;
    }[];
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function findAdminProductReferenceNotes(): Prisma.PrismaPromise<{
    id: string;
    isActive: boolean;
    name: string;
}[]>;
export declare function findAdminProductReferenceCollections(): Prisma.PrismaPromise<{
    id: string;
    name: string;
    slug: string;
    status: import("../generated/prisma/enums.js").CollectionStatus;
}[]>;
export declare function updateAdminProductStatus(id: string, input: AdminProductStatusInput): Prisma.Prisma__ProductClient<{
    _count: {
        collections: number;
    };
    concentration: string;
    fragranceFamily: string;
    id: string;
    images: {
        alt: string;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    name: string;
    slug: string;
    updatedAt: Date;
    variants: {
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
    }[];
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deactivateAdminProduct(id: string): Prisma.Prisma__ProductClient<{
    _count: {
        collections: number;
    };
    concentration: string;
    fragranceFamily: string;
    id: string;
    images: {
        alt: string;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    name: string;
    slug: string;
    updatedAt: Date;
    variants: {
        price: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
    }[];
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createAdminProductRecord(input: AdminProductCreateInput): Promise<{
    backInStockEnabled: boolean;
    collections: {
        collection: {
            accentColor: string | null;
            cardImageUrl: string | null;
            description: string;
            eyebrow: string | null;
            heroImageUrl: string | null;
            id: string;
            name: string;
            shortDescription: string | null;
            slug: string;
            status: import("../generated/prisma/enums.js").CollectionStatus;
        };
    }[];
    concentration: string;
    createdAt: Date;
    description: string;
    fragranceFamily: string;
    gender: string | null;
    id: string;
    images: {
        alt: string;
        id: string;
        imageType: import("../generated/prisma/enums.js").ProductImageType;
        isPrimary: boolean;
        mimeType: string | null;
        position: number;
        sizeBytes: number | null;
        storageKey: string | null;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    lowStockThreshold: number;
    name: string;
    notes: {
        note: {
            id: string;
            isActive: boolean;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
    sampleAvailable: boolean;
    samplePrice: import("@prisma/client-runtime-utils").Decimal | null;
    season: string[];
    slug: string;
    subtitle: string | null;
    updatedAt: Date;
    variants: {
        compareAtPrice: import("@prisma/client-runtime-utils").Decimal | null;
        format: import("../generated/prisma/enums.js").ProductFormat;
        id: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        sku: string;
        stock: number;
        volumeMl: number;
    }[];
}>;
export declare function updateAdminProductRecord(id: string, input: AdminProductUpdateInput): Promise<{
    product: {
        backInStockEnabled: boolean;
        collections: {
            collection: {
                accentColor: string | null;
                cardImageUrl: string | null;
                description: string;
                eyebrow: string | null;
                heroImageUrl: string | null;
                id: string;
                name: string;
                shortDescription: string | null;
                slug: string;
                status: import("../generated/prisma/enums.js").CollectionStatus;
            };
        }[];
        concentration: string;
        createdAt: Date;
        description: string;
        fragranceFamily: string;
        gender: string | null;
        id: string;
        images: {
            alt: string;
            id: string;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
            isPrimary: boolean;
            mimeType: string | null;
            position: number;
            sizeBytes: number | null;
            storageKey: string | null;
            url: string;
        }[];
        isActive: boolean;
        isFeatured: boolean;
        isLimited: boolean;
        isNew: boolean;
        longevity: string | null;
        lowStockThreshold: number;
        name: string;
        notes: {
            note: {
                id: string;
                isActive: boolean;
                name: string;
            };
            position: number;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
        }[];
        occasion: string[];
        reviews: {
            rating: number;
        }[];
        sampleAvailable: boolean;
        samplePrice: import("@prisma/client-runtime-utils").Decimal | null;
        season: string[];
        slug: string;
        subtitle: string | null;
        updatedAt: Date;
        variants: {
            compareAtPrice: import("@prisma/client-runtime-utils").Decimal | null;
            format: import("../generated/prisma/enums.js").ProductFormat;
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            sku: string;
            stock: number;
            volumeMl: number;
        }[];
    };
    removedStorageKeys: string[];
}>;
//# sourceMappingURL=adminProductRepository.d.ts.map