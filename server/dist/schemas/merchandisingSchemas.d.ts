import { z } from "zod";
export declare const campaignSchema: z.ZodObject<{
    slug: z.ZodString;
    type: z.ZodEnum<{
        CURATED_EDIT: "CURATED_EDIT";
        GIFT_SET: "GIFT_SET";
    }>;
    title: z.ZodString;
    eyebrow: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    description: z.ZodString;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    startsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    productIds: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
export declare const campaignUpdateSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        CURATED_EDIT: "CURATED_EDIT";
        GIFT_SET: "GIFT_SET";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    eyebrow: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    description: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        ARCHIVED: "ARCHIVED";
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
    }>>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    startsAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    endsAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    productIds: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString>>>;
}, z.core.$strict>;
export declare const promotionSchema: z.ZodObject<{
    code: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    description: z.ZodString;
    discountType: z.ZodEnum<{
        FIXED: "FIXED";
        PERCENT: "PERCENT";
    }>;
    amount: z.ZodNumber;
    minSubtotal: z.ZodDefault<z.ZodNumber>;
    startsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    usageLimit: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strict>;
export declare const promotionUpdateSchema: z.ZodObject<{
    code: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    description: z.ZodOptional<z.ZodString>;
    discountType: z.ZodOptional<z.ZodEnum<{
        FIXED: "FIXED";
        PERCENT: "PERCENT";
    }>>;
    amount: z.ZodOptional<z.ZodNumber>;
    minSubtotal: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    startsAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    endsAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    usageLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strict>;
export declare const promotionValidateSchema: z.ZodObject<{
    code: z.ZodString;
    subtotal: z.ZodNumber;
}, z.core.$strict>;
export declare const productMerchandisingSchema: z.ZodObject<{
    lowStockThreshold: z.ZodNumber;
    sampleAvailable: z.ZodBoolean;
    samplePrice: z.ZodNullable<z.ZodNumber>;
    backInStockEnabled: z.ZodBoolean;
}, z.core.$strict>;
export declare const stockAlertSchema: z.ZodObject<{
    productId: z.ZodString;
    email: z.ZodString;
}, z.core.$strict>;
export declare const stockAlertStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        NOTIFIED: "NOTIFIED";
    }>;
}, z.core.$strict>;
export type CampaignInput = z.infer<typeof campaignSchema>;
export type CampaignUpdateInput = z.infer<typeof campaignUpdateSchema>;
export type PromotionInput = z.infer<typeof promotionSchema>;
export type PromotionUpdateInput = z.infer<typeof promotionUpdateSchema>;
export type ProductMerchandisingInput = z.infer<typeof productMerchandisingSchema>;
export type StockAlertInput = z.infer<typeof stockAlertSchema>;
//# sourceMappingURL=merchandisingSchemas.d.ts.map