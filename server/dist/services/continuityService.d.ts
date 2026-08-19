import type { CartReplaceInput, ContinuityMergeInput, WishlistReplaceInput } from "../schemas/continuitySchemas.js";
export declare function getContinuity(userId: string): Promise<{
    data: {
        cart: {
            id: string | undefined;
            items: {
                id: string;
                productId: string;
                variantId: string;
                quantity: number;
                product: {
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
                variant: {
                    id: string;
                    format: import("../generated/prisma/enums.js").ProductFormat;
                    volumeMl: number;
                    price: number | null;
                    compareAtPrice: number | null;
                    sku: string;
                    stock: number;
                };
            }[];
            subtotal: number;
            totalQuantity: number;
        };
        wishlist: {
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
export declare function mergeContinuity(userId: string, input: ContinuityMergeInput): Promise<{
    data: {
        cart: {
            id: string | undefined;
            items: {
                id: string;
                productId: string;
                variantId: string;
                quantity: number;
                product: {
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
                variant: {
                    id: string;
                    format: import("../generated/prisma/enums.js").ProductFormat;
                    volumeMl: number;
                    price: number | null;
                    compareAtPrice: number | null;
                    sku: string;
                    stock: number;
                };
            }[];
            subtotal: number;
            totalQuantity: number;
        };
        wishlist: {
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
export declare function replaceCart(userId: string, input: CartReplaceInput): Promise<{
    data: {
        id: string | undefined;
        items: {
            id: string;
            productId: string;
            variantId: string;
            quantity: number;
            product: {
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
            variant: {
                id: string;
                format: import("../generated/prisma/enums.js").ProductFormat;
                volumeMl: number;
                price: number | null;
                compareAtPrice: number | null;
                sku: string;
                stock: number;
            };
        }[];
        subtotal: number;
        totalQuantity: number;
    };
}>;
export declare function replaceWishlist(userId: string, input: WishlistReplaceInput): Promise<{
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
}>;
//# sourceMappingURL=continuityService.d.ts.map