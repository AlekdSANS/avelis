import { prisma } from "../lib/prisma.js";
import { productSelect, mapProduct } from "../utils/productMapper.js";
import { HttpError } from "../utils/httpError.js";
async function normalizedCartItems(items) {
    const quantities = new Map();
    for (const item of items)
        quantities.set(item.variantId, Math.min(20, (quantities.get(item.variantId) ?? 0) + item.quantity));
    const variants = await prisma.productVariant.findMany({ where: { id: { in: [...quantities.keys()] }, product: { isActive: true } }, select: { id: true, productId: true, stock: true } });
    return variants.map((variant) => ({ variantId: variant.id, productId: variant.productId, quantity: Math.min(quantities.get(variant.id) ?? 0, variant.stock) })).filter((item) => item.quantity > 0);
}
async function replaceCartRecord(userId, items) {
    const normalized = await normalizedCartItems(items);
    await prisma.$transaction(async (tx) => {
        const cart = await tx.cart.upsert({ where: { userId }, update: {}, create: { userId }, select: { id: true } });
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
        if (normalized.length)
            await tx.cartItem.createMany({ data: normalized.map((item) => ({ ...item, cartId: cart.id })) });
    });
}
async function readCart(userId) {
    const cart = await prisma.cart.findUnique({ where: { userId }, select: { id: true, items: { select: { id: true, quantity: true, product: { select: productSelect }, variantId: true }, orderBy: { createdAt: "asc" } } } });
    const items = (cart?.items ?? []).map((item) => { const product = mapProduct(item.product); const variant = product.variants.find((candidate) => candidate.id === item.variantId); return variant ? { id: `${product.id}:${variant.id}`, productId: product.id, variantId: variant.id, quantity: item.quantity, product, variant } : null; }).filter((item) => item !== null);
    return { id: cart?.id, items, subtotal: items.reduce((sum, item) => sum + (item.variant.price ?? 0) * item.quantity, 0), totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0) };
}
async function readWishlist(userId) {
    const rows = await prisma.wishlistItem.findMany({ where: { userId, product: { isActive: true } }, select: { product: { select: productSelect } }, orderBy: { createdAt: "desc" } });
    return rows.map((row) => mapProduct(row.product));
}
async function replaceWishlistRecord(userId, productIds) {
    const unique = [...new Set(productIds)];
    const products = await prisma.product.findMany({ where: { id: { in: unique }, isActive: true }, select: { id: true } });
    await prisma.$transaction(async (tx) => { await tx.wishlistItem.deleteMany({ where: { userId } }); if (products.length)
        await tx.wishlistItem.createMany({ data: products.map(({ id: productId }) => ({ userId, productId })) }); });
}
export async function getContinuity(userId) { const [cart, wishlist] = await Promise.all([readCart(userId), readWishlist(userId)]); return { data: { cart, wishlist } }; }
export async function mergeContinuity(userId, input) {
    const current = await readCart(userId);
    const merged = new Map(current.items.map((item) => [item.variantId, item.quantity]));
    for (const item of input.cartItems)
        merged.set(item.variantId, Math.min(20, (merged.get(item.variantId) ?? 0) + item.quantity));
    const currentWishlist = await readWishlist(userId);
    await Promise.all([replaceCartRecord(userId, [...merged].map(([variantId, quantity]) => ({ variantId, quantity }))), replaceWishlistRecord(userId, [...currentWishlist.map((product) => product.id), ...input.wishlistProductIds])]);
    return getContinuity(userId);
}
export async function replaceCart(userId, input) { await replaceCartRecord(userId, input.items); return { data: await readCart(userId) }; }
export async function replaceWishlist(userId, input) { await replaceWishlistRecord(userId, input.productIds); return { data: await readWishlist(userId) }; }
//# sourceMappingURL=continuityService.js.map