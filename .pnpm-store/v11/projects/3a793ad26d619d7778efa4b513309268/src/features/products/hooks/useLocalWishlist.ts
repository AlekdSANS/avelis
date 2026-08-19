import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const WISHLIST_KEY = "avelis-local-wishlist";
type WishlistStore = { productIds: string[]; toggle: (id: string) => void; replace: (ids: string[]) => void; clear: () => void };
const useWishlistStore = create<WishlistStore>()(persist((set) => ({
  productIds: [],
  toggle: (id) => set((state) => ({ productIds: state.productIds.includes(id) ? state.productIds.filter((value) => value !== id) : [...state.productIds, id] })),
  replace: (ids) => set({ productIds: [...new Set(ids)] }),
  clear: () => set({ productIds: [] }),
}), { name: WISHLIST_KEY, storage: createJSONStorage(() => window.localStorage) }));
export function getLocalWishlistIds() { return useWishlistStore.getState().productIds; }
export function replaceLocalWishlist(ids: string[]) { useWishlistStore.getState().replace(ids); }
export function clearLocalWishlist() { useWishlistStore.getState().clear(); }
export function subscribeLocalWishlist(listener: (ids: string[]) => void) { return useWishlistStore.subscribe((state, previous) => { if (state.productIds !== previous.productIds) listener(state.productIds); }); }
export function useLocalWishlist() { const state = useWishlistStore(); return { wishlist: new Set(state.productIds), toggleWishlist: state.toggle }; }
