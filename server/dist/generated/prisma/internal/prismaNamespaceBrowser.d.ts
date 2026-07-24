import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly Address: 'Address';
    readonly Product: 'Product';
    readonly ProductVariant: 'ProductVariant';
    readonly ProductImage: 'ProductImage';
    readonly Note: 'Note';
    readonly ProductNote: 'ProductNote';
    readonly Collection: 'Collection';
    readonly ProductCollection: 'ProductCollection';
    readonly Cart: 'Cart';
    readonly CartItem: 'CartItem';
    readonly WishlistItem: 'WishlistItem';
    readonly Order: 'Order';
    readonly OrderItem: 'OrderItem';
    readonly Review: 'Review';
    readonly Session: 'Session';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly firstName: 'firstName';
    readonly lastName: 'lastName';
    readonly email: 'email';
    readonly passwordHash: 'passwordHash';
    readonly role: 'role';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AddressScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly fullName: 'fullName';
    readonly street: 'street';
    readonly buildingNumber: 'buildingNumber';
    readonly apartmentNumber: 'apartmentNumber';
    readonly postalCode: 'postalCode';
    readonly city: 'city';
    readonly country: 'country';
    readonly phone: 'phone';
    readonly isDefault: 'isDefault';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: 'id';
    readonly slug: 'slug';
    readonly name: 'name';
    readonly subtitle: 'subtitle';
    readonly description: 'description';
    readonly fragranceFamily: 'fragranceFamily';
    readonly concentration: 'concentration';
    readonly gender: 'gender';
    readonly longevity: 'longevity';
    readonly season: 'season';
    readonly occasion: 'occasion';
    readonly isFeatured: 'isFeatured';
    readonly isNew: 'isNew';
    readonly isLimited: 'isLimited';
    readonly isActive: 'isActive';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: 'id';
    readonly productId: 'productId';
    readonly format: 'format';
    readonly volumeMl: 'volumeMl';
    readonly price: 'price';
    readonly compareAtPrice: 'compareAtPrice';
    readonly sku: 'sku';
    readonly stock: 'stock';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: 'id';
    readonly productId: 'productId';
    readonly url: 'url';
    readonly alt: 'alt';
    readonly position: 'position';
    readonly isPrimary: 'isPrimary';
    readonly imageType: 'imageType';
    readonly createdAt: 'createdAt';
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const NoteScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
};
export type NoteScalarFieldEnum = (typeof NoteScalarFieldEnum)[keyof typeof NoteScalarFieldEnum];
export declare const ProductNoteScalarFieldEnum: {
    readonly productId: 'productId';
    readonly noteId: 'noteId';
    readonly type: 'type';
    readonly position: 'position';
};
export type ProductNoteScalarFieldEnum = (typeof ProductNoteScalarFieldEnum)[keyof typeof ProductNoteScalarFieldEnum];
export declare const CollectionScalarFieldEnum: {
    readonly id: 'id';
    readonly slug: 'slug';
    readonly name: 'name';
    readonly description: 'description';
    readonly imageUrl: 'imageUrl';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CollectionScalarFieldEnum = (typeof CollectionScalarFieldEnum)[keyof typeof CollectionScalarFieldEnum];
export declare const ProductCollectionScalarFieldEnum: {
    readonly productId: 'productId';
    readonly collectionId: 'collectionId';
};
export type ProductCollectionScalarFieldEnum = (typeof ProductCollectionScalarFieldEnum)[keyof typeof ProductCollectionScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: 'id';
    readonly cartId: 'cartId';
    readonly productId: 'productId';
    readonly variantId: 'variantId';
    readonly quantity: 'quantity';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const WishlistItemScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly productId: 'productId';
    readonly createdAt: 'createdAt';
};
export type WishlistItemScalarFieldEnum = (typeof WishlistItemScalarFieldEnum)[keyof typeof WishlistItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: 'id';
    readonly orderNumber: 'orderNumber';
    readonly userId: 'userId';
    readonly status: 'status';
    readonly shippingName: 'shippingName';
    readonly shippingStreet: 'shippingStreet';
    readonly shippingCity: 'shippingCity';
    readonly shippingZip: 'shippingZip';
    readonly shippingCountry: 'shippingCountry';
    readonly shippingPhone: 'shippingPhone';
    readonly subtotal: 'subtotal';
    readonly shippingCost: 'shippingCost';
    readonly total: 'total';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: 'id';
    readonly orderId: 'orderId';
    readonly productId: 'productId';
    readonly variantId: 'variantId';
    readonly productName: 'productName';
    readonly productSlug: 'productSlug';
    readonly imageUrl: 'imageUrl';
    readonly volumeMl: 'volumeMl';
    readonly quantity: 'quantity';
    readonly unitPrice: 'unitPrice';
    readonly totalPrice: 'totalPrice';
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly productId: 'productId';
    readonly rating: 'rating';
    readonly title: 'title';
    readonly content: 'content';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly tokenHash: 'tokenHash';
    readonly expiresAt: 'expiresAt';
    readonly createdAt: 'createdAt';
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map