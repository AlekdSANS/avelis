export declare function findCollections(): Promise<{
    _count: {
        products: number;
    };
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    description: string;
    eyebrow: string | null;
    heroImageUrl: string | null;
    id: string;
    isFeatured: boolean;
    materialNotes: string[];
    mobileImageUrl: string | null;
    name: string;
    publishedAt: Date | null;
    shortDescription: string | null;
    slug: string;
    sortOrder: number;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
}[]>;
export declare function findCollectionBySlug(slug: string): Promise<{
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    description: string;
    eyebrow: string | null;
    heroImageUrl: string | null;
    id: string;
    isFeatured: boolean;
    materialNotes: string[];
    mobileImageUrl: string | null;
    name: string;
    products: {
        product: {
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
    seoDescription: string | null;
    seoTitle: string | null;
    shortDescription: string | null;
    slug: string;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
} | null>;
//# sourceMappingURL=collectionRepository.d.ts.map