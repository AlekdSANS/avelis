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
    readonly PENDING: 'PENDING';
    readonly PAID: 'PAID';
    readonly PROCESSING: 'PROCESSING';
    readonly SHIPPED: 'SHIPPED';
    readonly DELIVERED: 'DELIVERED';
    readonly CANCELLED: 'CANCELLED';
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
//# sourceMappingURL=enums.d.ts.map