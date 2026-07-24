import type { FeaturedProductsQuery, ProductListQuery } from "../schemas/productSchemas.js";
export declare function listProducts(query: ProductListQuery): Promise<{
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
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        isActive: boolean;
        rating: number | null;
        reviewCount: number;
        images: {
            id: string;
            url: string;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        notes: {
            name: string;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function getFeaturedProducts(query: FeaturedProductsQuery): Promise<{
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
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        isActive: boolean;
        rating: number | null;
        reviewCount: number;
        images: {
            id: string;
            url: string;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        notes: {
            name: string;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }[];
}>;
export declare function getProductBySlug(slug: string): Promise<{
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
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        isActive: boolean;
        rating: number | null;
        reviewCount: number;
        images: {
            id: string;
            url: string;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        notes: {
            name: string;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
        }[];
        createdAt: string;
        updatedAt: string;
    };
}>;
export declare function getRelatedProducts(productId: string): Promise<{
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
        isFeatured: boolean;
        isNew: boolean;
        isLimited: boolean;
        isActive: boolean;
        rating: number | null;
        reviewCount: number;
        images: {
            id: string;
            url: string;
            alt: string;
            position: number;
            isPrimary: boolean;
            imageType: import("../generated/prisma/enums.js").ProductImageType;
        }[];
        variants: {
            id: string;
            format: import("../generated/prisma/enums.js").ProductFormat;
            volumeMl: number;
            price: number | null;
            compareAtPrice: number | null;
            sku: string;
            stock: number;
        }[];
        notes: {
            name: string;
            type: import("../generated/prisma/enums.js").FragranceNoteType;
            position: number;
        }[];
        collections: {
            description: string;
            id: string;
            imageUrl: string | null;
            name: string;
            slug: string;
        }[];
        createdAt: string;
        updatedAt: string;
    }[];
}>;
//# sourceMappingURL=productService.d.ts.map