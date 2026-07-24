import type { Prisma } from "../generated/prisma/client.js";
import type { ProductListQuery } from "../schemas/productSchemas.js";
export declare function buildVariantWhere(query: ProductListQuery): Prisma.ProductVariantWhereInput;
export declare function buildProductWhere(query: ProductListQuery): Prisma.ProductWhereInput;
export declare function countProducts(query: ProductListQuery): Promise<number>;
export declare function findProducts(query: ProductListQuery): Promise<{
    collections: {
        collection: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
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
        position: number;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    name: string;
    notes: {
        note: {
            id: string;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
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
}[]>;
export declare function findFeaturedProducts(limit: number): Promise<{
    collections: {
        collection: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
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
        position: number;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    name: string;
    notes: {
        note: {
            id: string;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
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
}[]>;
export declare function findProductBySlug(slug: string): Promise<{
    collections: {
        collection: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
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
        position: number;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    name: string;
    notes: {
        note: {
            id: string;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
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
} | null>;
export declare function findRelatedSource(productId: string): Promise<{
    collections: {
        collectionId: string;
    }[];
    fragranceFamily: string;
    id: string;
    notes: {
        noteId: string;
    }[];
} | null>;
export declare function findRelatedCandidates(params: {
    productId: string;
    fragranceFamily: string;
    collectionIds: string[];
    noteIds: string[];
}): Promise<{
    collections: {
        collection: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
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
        position: number;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    name: string;
    notes: {
        note: {
            id: string;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
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
}[]>;
export declare function findRelatedFallback(params: {
    excludedProductIds: string[];
    take: number;
}): Promise<{
    collections: {
        collection: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
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
        position: number;
        url: string;
    }[];
    isActive: boolean;
    isFeatured: boolean;
    isLimited: boolean;
    isNew: boolean;
    longevity: string | null;
    name: string;
    notes: {
        note: {
            id: string;
            name: string;
        };
        position: number;
        type: import("../generated/prisma/enums.js").FragranceNoteType;
    }[];
    occasion: string[];
    reviews: {
        rating: number;
    }[];
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
}[]>;
//# sourceMappingURL=productRepository.d.ts.map