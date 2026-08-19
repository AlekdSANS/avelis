export declare function listCollections(): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        eyebrow: string | null;
        shortDescription: string | null;
        description: string;
        heroImageUrl: string | null;
        cardImageUrl: string | null;
        mobileImageUrl: string | null;
        accentColor: string | null;
        storyHeadline: string | null;
        storyBody: string | null;
        storyImageUrl: string | null;
        materialNotes: string[];
        campaignLabel: string | null;
        isFeatured: boolean;
        productCount: number;
    }[];
}>;
export declare function getCollectionBySlug(slug: string): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        eyebrow: string | null;
        shortDescription: string | null;
        description: string;
        heroImageUrl: string | null;
        cardImageUrl: string | null;
        mobileImageUrl: string | null;
        accentColor: string | null;
        storyHeadline: string | null;
        storyBody: string | null;
        storyImageUrl: string | null;
        materialNotes: string[];
        campaignLabel: string | null;
        isFeatured: boolean;
        seoTitle: string | null;
        seoDescription: string | null;
        products: {
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
        }[];
    };
}>;
//# sourceMappingURL=collectionService.d.ts.map