import { useEffect } from "react";
import { useCurrentUser } from "../auth/hooks/useAuth";
import { getLocalCartItems, replaceLocalCart, subscribeLocalCart } from "../cart/hooks/useCart";
import { getLocalWishlistIds, replaceLocalWishlist, subscribeLocalWishlist } from "../products/hooks/useLocalWishlist";
import { CONTINUITY_OWNER_KEY, continuityService } from "../../services/continuityService";
export function CustomerContinuity() {
  const user = useCurrentUser();
  useEffect(() => {
    const account = user.data;
    if (!account) return;
    let active = true;
    let cartTimer: number | undefined;
    let wishlistTimer: number | undefined;
    let unsubscribeCart = () => {};
    let unsubscribeWishlist = () => {};
    const start = async () => {
      const owner = localStorage.getItem(CONTINUITY_OWNER_KEY);
      const state = owner === account.id ? await continuityService.get() : await continuityService.merge(getLocalCartItems().map(({ variantId, quantity }) => ({ variantId, quantity })), getLocalWishlistIds());
      if (!active) return;
      replaceLocalCart(state.cart.items);
      replaceLocalWishlist(state.wishlist.map((product) => product.id));
      localStorage.setItem(CONTINUITY_OWNER_KEY, account.id);
      unsubscribeCart = subscribeLocalCart((items) => { window.clearTimeout(cartTimer); cartTimer = window.setTimeout(() => { void continuityService.replaceCart(items.map(({ variantId, quantity }) => ({ variantId, quantity }))); }, 250); });
      unsubscribeWishlist = subscribeLocalWishlist((ids) => { window.clearTimeout(wishlistTimer); wishlistTimer = window.setTimeout(() => { void continuityService.replaceWishlist(ids); }, 250); });
    };
    void start().catch(() => { /* keep the local experience available while offline */ });
    return () => { active = false; window.clearTimeout(cartTimer); window.clearTimeout(wishlistTimer); unsubscribeCart(); unsubscribeWishlist(); };
  }, [user.data]);
  return null;
}
