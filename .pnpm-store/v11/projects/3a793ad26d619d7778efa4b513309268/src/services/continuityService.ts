import { apiClient } from "./apiClient";
import type { ApiResponse, Cart, Product } from "../types";
export interface ContinuityState { cart: Cart; wishlist: Product[]; }
export const CONTINUITY_OWNER_KEY = "avelis-continuity-owner";
export function clearContinuityOwner() { try { localStorage.removeItem(CONTINUITY_OWNER_KEY); } catch { /* storage may be unavailable */ } }
export const continuityService = {
  async get() { return (await apiClient.get<ApiResponse<ContinuityState>>("/account/continuity")).data.data; },
  async merge(cartItems: { variantId: string; quantity: number }[], wishlistProductIds: string[]) { return (await apiClient.post<ApiResponse<ContinuityState>>("/account/continuity/merge", { cartItems, wishlistProductIds })).data.data; },
  async replaceCart(items: { variantId: string; quantity: number }[]) { return (await apiClient.put<ApiResponse<Cart>>("/account/continuity/cart", { items })).data.data; },
  async replaceWishlist(productIds: string[]) { return (await apiClient.put<ApiResponse<Product[]>>("/account/continuity/wishlist", { productIds })).data.data; },
};
