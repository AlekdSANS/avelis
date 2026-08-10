import type { Prisma } from "../generated/prisma/client.js";
import type { AdminCollectionCreateInput, AdminCollectionListQuery, AdminCollectionUpdateInput } from "../schemas/adminCollectionSchemas.js";
export declare const adminCollectionDetailSelect: {
    id: true;
    name: true;
    slug: true;
    eyebrow: true;
    shortDescription: true;
    description: true;
    heroImageUrl: true;
    cardImageUrl: true;
    mobileImageUrl: true;
    accentColor: true;
    status: true;
    isFeatured: true;
    sortOrder: true;
    publishedAt: true;
    seoTitle: true;
    seoDescription: true;
    storyHeadline: true;
    storyBody: true;
    storyImageUrl: true;
    materialNotes: true;
    campaignLabel: true;
    createdAt: true;
    updatedAt: true;
    products: {
        select: {
            sortOrder: true;
            product: {
                select: {
                    id: true;
                    name: true;
                    slug: true;
                    isActive: true;
                    variants: {
                        select: {
                            sku: true;
                        };
                        orderBy: ({
                            volumeMl?: never;
                            format: "asc";
                        } | {
                            format?: never;
                            volumeMl: "asc";
                        })[];
                        take: number;
                    };
                    images: {
                        select: {
                            url: true;
                            alt: true;
                        };
                        orderBy: ({
                            position?: never;
                            createdAt?: never;
                            isPrimary: "desc";
                        } | {
                            isPrimary?: never;
                            createdAt?: never;
                            position: "asc";
                        } | {
                            isPrimary?: never;
                            position?: never;
                            createdAt: "asc";
                        })[];
                        take: number;
                    };
                };
            };
        };
        orderBy: ({
            sortOrder: "asc";
            productId?: never;
        } | {
            sortOrder?: never;
            productId: "asc";
        })[];
    };
};
export declare function countAdminCollections(query: AdminCollectionListQuery): Prisma.PrismaPromise<number>;
export declare function findAdminCollections(query: AdminCollectionListQuery): Prisma.PrismaPromise<{
    _count: {
        products: number;
    };
    cardImageUrl: string | null;
    createdAt: Date;
    id: string;
    isFeatured: boolean;
    name: string;
    publishedAt: Date | null;
    slug: string;
    sortOrder: number;
    status: import("../generated/prisma/enums.js").CollectionStatus;
    updatedAt: Date;
}[]>;
export declare function findAdminCollectionById(id: string): Prisma.Prisma__CollectionClient<{
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    createdAt: Date;
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
            id: string;
            images: {
                alt: string;
                url: string;
            }[];
            isActive: boolean;
            name: string;
            slug: string;
            variants: {
                sku: string;
            }[];
        };
        sortOrder: number;
    }[];
    publishedAt: Date | null;
    seoDescription: string | null;
    seoTitle: string | null;
    shortDescription: string | null;
    slug: string;
    sortOrder: number;
    status: import("../generated/prisma/enums.js").CollectionStatus;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
    updatedAt: Date;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function findAdminCollectionBySlug(slug: string, excludingId?: string): Prisma.Prisma__CollectionClient<{
    id: string;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createAdminCollectionRecord(input: AdminCollectionCreateInput & {
    slug: string;
}): Promise<{
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    createdAt: Date;
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
            id: string;
            images: {
                alt: string;
                url: string;
            }[];
            isActive: boolean;
            name: string;
            slug: string;
            variants: {
                sku: string;
            }[];
        };
        sortOrder: number;
    }[];
    publishedAt: Date | null;
    seoDescription: string | null;
    seoTitle: string | null;
    shortDescription: string | null;
    slug: string;
    sortOrder: number;
    status: import("../generated/prisma/enums.js").CollectionStatus;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
    updatedAt: Date;
}>;
export declare function updateAdminCollectionRecord(id: string, input: AdminCollectionUpdateInput): Promise<{
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    createdAt: Date;
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
            id: string;
            images: {
                alt: string;
                url: string;
            }[];
            isActive: boolean;
            name: string;
            slug: string;
            variants: {
                sku: string;
            }[];
        };
        sortOrder: number;
    }[];
    publishedAt: Date | null;
    seoDescription: string | null;
    seoTitle: string | null;
    shortDescription: string | null;
    slug: string;
    sortOrder: number;
    status: import("../generated/prisma/enums.js").CollectionStatus;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
    updatedAt: Date;
}>;
export declare function archiveAdminCollectionRecord(id: string): Prisma.Prisma__CollectionClient<{
    accentColor: string | null;
    campaignLabel: string | null;
    cardImageUrl: string | null;
    createdAt: Date;
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
            id: string;
            images: {
                alt: string;
                url: string;
            }[];
            isActive: boolean;
            name: string;
            slug: string;
            variants: {
                sku: string;
            }[];
        };
        sortOrder: number;
    }[];
    publishedAt: Date | null;
    seoDescription: string | null;
    seoTitle: string | null;
    shortDescription: string | null;
    slug: string;
    sortOrder: number;
    status: import("../generated/prisma/enums.js").CollectionStatus;
    storyBody: string | null;
    storyHeadline: string | null;
    storyImageUrl: string | null;
    updatedAt: Date;
}, never, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
//# sourceMappingURL=adminCollectionRepository.d.ts.map