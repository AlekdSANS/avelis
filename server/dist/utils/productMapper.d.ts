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
    lowStockThreshold: true;
    sampleAvailable: true;
    samplePrice: true;
    backInStockEnabled: true;
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
            storageKey: true;
            mimeType: true;
            sizeBytes: true;
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
                    isActive: true;
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
                    eyebrow: true;
                    shortDescription: true;
                    description: true;
                    cardImageUrl: true;
                    heroImageUrl: true;
                    accentColor: true;
                    status: true;
                };
            };
        };
    };
    reviews: {
        where: {
            status: "APPROVED";
        };
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
    lowStockThreshold: number;
    sampleAvailable: boolean;
    samplePrice: number | null;
    backInStockEnabled: boolean;
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
        id: string;
        slug: string;
        name: string;
        eyebrow: string | null;
        shortDescription: string | null;
        description: string;
        cardImageUrl: string | null;
        heroImageUrl: string | null;
        accentColor: string | null;
    }[];
    createdAt: string;
    updatedAt: string;
};
//# sourceMappingURL=productMapper.d.ts.map