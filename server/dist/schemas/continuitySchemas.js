import { z } from "zod";
const cartItem = z.object({ variantId: z.string().trim().min(1).max(64), quantity: z.number().int().min(1).max(20) }).strict();
export const continuityMergeSchema = z.object({ cartItems: z.array(cartItem).max(50).default([]), wishlistProductIds: z.array(z.string().trim().min(1).max(64)).max(200).default([]) }).strict();
export const cartReplaceSchema = z.object({ items: z.array(cartItem).max(50) }).strict();
export const wishlistReplaceSchema = z.object({ productIds: z.array(z.string().trim().min(1).max(64)).max(200) }).strict();
//# sourceMappingURL=continuitySchemas.js.map