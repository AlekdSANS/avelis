import type { Prisma } from "../generated/prisma/client.js";
export declare const productSelect: {
    id: true;
    slug: true;
    name: true;
    subtitle: true;
    description: true;
    fragranceFamily: true;
    concentration: true;
    gender: true;
    longevity: true;
    season: true;
    occasion: true;
    isFeatured: true;
    isNew: true;
    isLimited: true;
    isActive: true;
    createdAt: true;
    updatedAt: true;
    variants: {
        select: {
            id: true;
            format: true;
            volumeMl: true;
            price: true;
            compareAtPrice: true;
            sku: true;
            stock: true;
        };
        orderBy: ({
            format: "asc";
            volumeMl?: never;
        } | {
            format?: never;
            volumeMl: "asc";
        })[];
    };
    images: {
        select: {
            id: true;
            url: true;
            alt: true;
            position: true;
            isPrimary: true;
            imageType: true;
        };
        orderBy: ({
            position: "asc";
            createdAt?: never;
        } | {
            position?: never;
            createdAt: "asc";
        })[];
    };
    notes: {
        select: {
            type: true;
            position: true;
            note: {
                select: {
                    id: true;
                    name: true;
                };
            };
        };
        orderBy: {
            position: "asc";
        }[];
    };
    collections: {
        select: {
            collection: {
                select: {
                    id: true;
                    slug: true;
                    name: true;
                    description: true;
                    imageUrl: true;
                };
            };
        };
    };
    reviews: {
        select: {
            rating: true;
        };
    };
};
export type ProductRecord = Prisma.ProductGetPayload<{
    select: typeof productSelect;
}>;
export declare function mapProduct(product: ProductRecord): {
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
//# sourceMappingURL=productMapper.d.ts.map