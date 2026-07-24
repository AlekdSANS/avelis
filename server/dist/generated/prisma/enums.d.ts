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
//# sourceMappingURL=enums.d.ts.map