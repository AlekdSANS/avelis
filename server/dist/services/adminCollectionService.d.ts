import type { AdminCollectionCreateInput, AdminCollectionListQuery, AdminCollectionUpdateInput } from "../schemas/adminCollectionSchemas.js";
export declare function listAdminCollections(query: AdminCollectionListQuery): Promise<{
    data: {
        productCount: number;
        publishedAt: string | null;
        createdAt: string;
        updatedAt: string;
        _count: undefined;
        cardImageUrl: string | null;
        id: string;
        isFeatured: boolean;
        name: string;
        slug: string;
        sortOrder: number;
        status: import("../generated/prisma/enums.js").CollectionStatus;
    }[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}>;
export declare function getAdminCollection(id: string): Promise<{
    data: {
        productIds: string[];
        products: {
            id: string;
            name: string;
            slug: string;
            sku: string | null;
            image: {
                alt: string;
                url: string;
            } | null;
            isActive: boolean;
            sortOrder: number;
        }[];
        publishedAt: string | null;
        createdAt: string;
        updatedAt: string;
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
        seoDescription: string | null;
        seoTitle: string | null;
        shortDescription: string | null;
        slug: string;
        sortOrder: number;
        status: import("../generated/prisma/enums.js").CollectionStatus;
        storyBody: string | null;
        storyHeadline: string | null;
        storyImageUrl: string | null;
    };
}>;
export declare function createAdminCollection(input: AdminCollectionCreateInput): Promise<{
    data: {
        productIds: string[];
        products: {
            id: string;
            name: string;
            slug: string;
            sku: string | null;
            image: {
                alt: string;
                url: string;
            } | null;
            isActive: boolean;
            sortOrder: number;
        }[];
        publishedAt: string | null;
        createdAt: string;
        updatedAt: string;
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
        seoDescription: string | null;
        seoTitle: string | null;
        shortDescription: string | null;
        slug: string;
        sortOrder: number;
        status: import("../generated/prisma/enums.js").CollectionStatus;
        storyBody: string | null;
        storyHeadline: string | null;
        storyImageUrl: string | null;
    };
}>;
export declare function updateAdminCollection(id: string, input: AdminCollectionUpdateInput): Promise<{
    data: {
        productIds: string[];
        products: {
            id: string;
            name: string;
            slug: string;
            sku: string | null;
            image: {
                alt: string;
                url: string;
            } | null;
            isActive: boolean;
            sortOrder: number;
        }[];
        publishedAt: string | null;
        createdAt: string;
        updatedAt: string;
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
        seoDescription: string | null;
        seoTitle: string | null;
        shortDescription: string | null;
        slug: string;
        sortOrder: number;
        status: import("../generated/prisma/enums.js").CollectionStatus;
        storyBody: string | null;
        storyHeadline: string | null;
        storyImageUrl: string | null;
    };
}>;
export declare function archiveAdminCollection(id: string): Promise<{
    data: {
        productIds: string[];
        products: {
            id: string;
            name: string;
            slug: string;
            sku: string | null;
            image: {
                alt: string;
                url: string;
            } | null;
            isActive: boolean;
            sortOrder: number;
        }[];
        publishedAt: string | null;
        createdAt: string;
        updatedAt: string;
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
        seoDescription: string | null;
        seoTitle: string | null;
        shortDescription: string | null;
        slug: string;
        sortOrder: number;
        status: import("../generated/prisma/enums.js").CollectionStatus;
        storyBody: string | null;
        storyHeadline: string | null;
        storyImageUrl: string | null;
    };
    message: string;
}>;
//# sourceMappingURL=adminCollectionService.d.ts.map