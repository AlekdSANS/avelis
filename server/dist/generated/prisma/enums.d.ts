export declare const UserRole: {
    readonly USER: 'USER';
    readonly ADMIN: 'ADMIN';
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const FragranceNoteType: {
    readonly TOP: 'TOP';
    readonly HEART: 'HEART';
    readonly BASE: 'BASE';
};
export type FragranceNoteType = (typeof FragranceNoteType)[keyof typeof FragranceNoteType];
export declare const ProductFormat: {
    readonly BOTTLE: 'BOTTLE';
    readonly REFILL: 'REFILL';
};
export type ProductFormat = (typeof ProductFormat)[keyof typeof ProductFormat];
export declare const ProductImageType: {
    readonly MAIN: 'MAIN';
    readonly GALLERY: 'GALLERY';
    readonly HOVER: 'HOVER';
    readonly REFILL: 'REFILL';
};
export type ProductImageType = (typeof ProductImageType)[keyof typeof ProductImageType];
export declare const OrderStatus: {
    readonly PENDING_PAYMENT: 'PENDING_PAYMENT';
    readonly CONFIRMED: 'CONFIRMED';
    readonly PROCESSING: 'PROCESSING';
    readonly SHIPPED: 'SHIPPED';
    readonly DELIVERED: 'DELIVERED';
    readonly CANCELLED: 'CANCELLED';
    readonly REFUNDED: 'REFUNDED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: 'PENDING';
    readonly PAID: 'PAID';
    readonly FAILED: 'FAILED';
    readonly REFUNDED: 'REFUNDED';
    readonly CANCELLED: 'CANCELLED';
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const PaymentMethod: {
    readonly CARD: 'CARD';
    readonly BLIK: 'BLIK';
    readonly CASH_ON_DELIVERY: 'CASH_ON_DELIVERY';
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const ShippingMethod: {
    readonly STANDARD: 'STANDARD';
    readonly EXPRESS: 'EXPRESS';
};
export type ShippingMethod = (typeof ShippingMethod)[keyof typeof ShippingMethod];
export declare const CollectionStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type CollectionStatus = (typeof CollectionStatus)[keyof typeof CollectionStatus];
export declare const ReviewStatus: {
    readonly PENDING: 'PENDING';
    readonly APPROVED: 'APPROVED';
    readonly REJECTED: 'REJECTED';
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
export declare const JournalStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type JournalStatus = (typeof JournalStatus)[keyof typeof JournalStatus];
export declare const PromotionDiscountType: {
    readonly PERCENT: 'PERCENT';
    readonly FIXED: 'FIXED';
};
export type PromotionDiscountType = (typeof PromotionDiscountType)[keyof typeof PromotionDiscountType];
export declare const MerchandisingCampaignType: {
    readonly GIFT_SET: 'GIFT_SET';
    readonly CURATED_EDIT: 'CURATED_EDIT';
};
export type MerchandisingCampaignType = (typeof MerchandisingCampaignType)[keyof typeof MerchandisingCampaignType];
export declare const MerchandisingStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type MerchandisingStatus = (typeof MerchandisingStatus)[keyof typeof MerchandisingStatus];
export declare const StockAlertStatus: {
    readonly PENDING: 'PENDING';
    readonly NOTIFIED: 'NOTIFIED';
    readonly CANCELLED: 'CANCELLED';
};
export type StockAlertStatus = (typeof StockAlertStatus)[keyof typeof StockAlertStatus];
//# sourceMappingURL=enums.d.ts.map