export declare function findCollections(): Promise<{
    _count: {
        products: number;
    };
    description: string;
    id: string;
    imageUrl: string | null;
    name: string;
    slug: string;
}[]>;
export declare function findCollectionBySlug(slug: string): Promise<{
    description: string;
    id: string;
    imageUrl: string | null;
    name: string;
    products: {
        product: {
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
        };
    }[];
    slug: string;
} | null>;
//# sourceMappingURL=collectionRepository.d.ts.map