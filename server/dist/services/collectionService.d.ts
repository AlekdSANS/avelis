export declare function listCollections(): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        description: string;
        imageUrl: string | null;
        productCount: number;
    }[];
}>;
export declare function getCollectionBySlug(slug: string): Promise<{
    data: {
        id: string;
        slug: string;
        name: string;
        description: string;
        imageUrl: string | null;
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
    };
}>;
//# sourceMappingURL=collectionService.d.ts.map