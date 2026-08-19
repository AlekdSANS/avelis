import type { CampaignInput, CampaignUpdateInput, ProductMerchandisingInput, PromotionInput, PromotionUpdateInput, StockAlertInput } from "../schemas/merchandisingSchemas.js";
export declare function listPublicCampaigns(): Promise<{
    data: any[];
}>;
export declare function getProductMerchandising(productId: string): Promise<{
    data: {
        sampleAvailable: boolean;
        samplePrice: number | null;
        lowStock: boolean;
        outOfStock: boolean;
        backInStockEnabled: boolean;
        recommendations: {
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
export declare function validatePromotion(code: string, subtotalNumber: number): Promise<{
    data: {
        code: string;
        description: string;
        discount: number;
    };
}>;
export declare function subscribeStockAlert(input: StockAlertInput, userId?: string): Promise<{
    data: {
        id: string;
        status: import("../generated/prisma/enums.js").StockAlertStatus;
    };
    message: string;
}>;
export declare function getAdminMerchandising(): Promise<{
    data: {
        campaigns: any[];
        promotions: {
            id: string;
            code: string;
            description: string;
            discountType: import("../generated/prisma/enums.js").PromotionDiscountType;
            usageLimit: number | null;
            usageCount: number;
            isActive: boolean;
            amount: number;
            minSubtotal: number;
            startsAt: string | null;
            endsAt: string | null;
            createdAt: string;
            updatedAt: string;
        }[];
        alerts: {
            id: string;
            email: string;
            userId: string | null;
            productId: string;
            status: import("../generated/prisma/enums.js").StockAlertStatus;
            createdAt: string;
            updatedAt: string;
            notifiedAt: string | null;
            product: {
                name: string;
                slug: string;
            };
        }[];
        products: {
            samplePrice: number | null;
            backInStockEnabled: boolean;
            id: string;
            lowStockThreshold: number;
            name: string;
            sampleAvailable: boolean;
            slug: string;
        }[];
    };
}>;
export declare function createCampaign(input: CampaignInput): Promise<{
    data: any;
}>;
export declare function updateCampaign(id: string, input: CampaignUpdateInput): Promise<{
    data: any;
}>;
export declare function deleteCampaign(id: string): Promise<{
    data: {
        id: string;
    };
}>;
export declare function createPromotion(input: PromotionInput): Promise<{
    data: {
        id: string;
        code: string;
        description: string;
        discountType: import("../generated/prisma/enums.js").PromotionDiscountType;
        amount: import("@prisma/client-runtime-utils").Decimal;
        minSubtotal: import("@prisma/client-runtime-utils").Decimal;
        startsAt: Date | null;
        endsAt: Date | null;
        usageLimit: number | null;
        usageCount: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
export declare function updatePromotion(id: string, input: PromotionUpdateInput): Promise<{
    data: {
        id: string;
        code: string;
        description: string;
        discountType: import("../generated/prisma/enums.js").PromotionDiscountType;
        amount: import("@prisma/client-runtime-utils").Decimal;
        minSubtotal: import("@prisma/client-runtime-utils").Decimal;
        startsAt: Date | null;
        endsAt: Date | null;
        usageLimit: number | null;
        usageCount: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
export declare function deletePromotion(id: string): Promise<{
    data: {
        id: string;
    };
}>;
export declare function updateProductMerchandising(id: string, input: ProductMerchandisingInput): Promise<{
    data: {
        samplePrice: number | null;
        backInStockEnabled: boolean;
        id: string;
        lowStockThreshold: number;
        name: string;
        sampleAvailable: boolean;
        slug: string;
    };
}>;
export declare function updateStockAlert(id: string, status: "NOTIFIED" | "CANCELLED"): Promise<{
    data: {
        id: string;
        email: string;
        userId: string | null;
        productId: string;
        status: import("../generated/prisma/enums.js").StockAlertStatus;
        notifiedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    };
}>;
//# sourceMappingURL=merchandisingService.d.ts.map