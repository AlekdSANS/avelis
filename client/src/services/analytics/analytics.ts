import type { CartItem } from "../../types/cart";
import type { Order } from "../../types/order";
import type { Product, ProductVariant } from "../../types/product";
import type { UserRole } from "../../types/user";
import { pushToDataLayer } from "./dataLayer";
import {
  getDefaultAnalyticsVariant,
  mapCartItemToAnalyticsItem,
  mapOrderItemToAnalyticsItem,
  mapProductToAnalyticsItem,
} from "./ecommerceMapper";
import {
  createAddPaymentInfoEvent,
  createAddShippingInfoEvent,
  createAddToCartEvent,
  createAuthEvent,
  createBeginCheckoutEvent,
  createPromotionEvent,
  createPurchaseEvent,
  createRemoveFromCartEvent,
  createSearchEvent,
  createSelectItemEvent,
  createViewCartEvent,
  createViewItemEvent,
  createViewItemListEvent,
  createWishlistEvent,
} from "./events";
import {
  hasPurchaseBeenEmitted,
  markPurchaseEmitted,
} from "./purchaseDeduplication";
import type {
  AnalyticsListContext,
  PromotionItem,
} from "./types";

const DEFAULT_CURRENCY = "PLN";
const emittedViewKeys = new Set<string>();

function emitOnce(key: string, emit: () => boolean): boolean {
  if (emittedViewKeys.has(key)) {
    return false;
  }

  emittedViewKeys.add(key);
  return emit();
}

function getCartValue(items: readonly CartItem[]): number {
  const valueCents = items.reduce(
    (total, item) =>
      total + Math.round(item.variant.price * 100) * item.quantity,
    0,
  );
  return valueCents / 100;
}

export function trackViewItemList(
  products: readonly Product[],
  context: Omit<AnalyticsListContext, "itemIndex">,
  viewKey: string,
): boolean {
  const items = products.flatMap((product, index) => {
    const variant = getDefaultAnalyticsVariant(product);
    return variant
      ? [
          mapProductToAnalyticsItem(product, variant, 1, {
            ...context,
            itemIndex: index,
          }),
        ]
      : [];
  });

  if (items.length === 0) {
    return false;
  }

  return emitOnce(
    `list:${viewKey}:${context.itemListId}`,
    () =>
      pushToDataLayer(
        createViewItemListEvent(
          context.itemListId,
          context.itemListName,
          items,
        ),
      ),
  );
}

export function trackSelectItem(
  product: Product,
  context: AnalyticsListContext,
): boolean {
  const variant = getDefaultAnalyticsVariant(product);
  return variant
    ? pushToDataLayer(
        createSelectItemEvent(
          context.itemListId,
          context.itemListName,
          mapProductToAnalyticsItem(product, variant, 1, context),
        ),
      )
    : false;
}

export function trackViewItem(
  product: Product,
  variant: ProductVariant,
  viewKey: string,
): boolean {
  return emitOnce(
    `product:${viewKey}:${product.slug}`,
    () =>
      pushToDataLayer(
        createViewItemEvent(
          DEFAULT_CURRENCY,
          mapProductToAnalyticsItem(product, variant),
        ),
      ),
  );
}

export function trackAddToCart(
  product: Product,
  variant: ProductVariant,
  quantity: number,
): boolean {
  return pushToDataLayer(
    createAddToCartEvent(
      DEFAULT_CURRENCY,
      mapProductToAnalyticsItem(product, variant, quantity),
    ),
  );
}

export function trackRemoveFromCart(
  item: CartItem,
  quantity: number,
): boolean {
  return pushToDataLayer(
    createRemoveFromCartEvent(
      DEFAULT_CURRENCY,
      mapCartItemToAnalyticsItem(item, quantity),
    ),
  );
}

export function trackViewCart(
  items: readonly CartItem[],
  viewKey: string,
): boolean {
  if (items.length === 0) {
    return false;
  }

  return emitOnce(
    `cart:${viewKey}`,
    () =>
      pushToDataLayer(
        createViewCartEvent(
          DEFAULT_CURRENCY,
          getCartValue(items),
          items.map((item) => mapCartItemToAnalyticsItem(item)),
        ),
      ),
  );
}

export function trackBeginCheckout(
  items: readonly CartItem[],
  viewKey: string,
): boolean {
  if (items.length === 0) {
    return false;
  }

  return emitOnce(
    `checkout:${viewKey}`,
    () =>
      pushToDataLayer(
        createBeginCheckoutEvent(
          DEFAULT_CURRENCY,
          getCartValue(items),
          items.map((item) => mapCartItemToAnalyticsItem(item)),
        ),
      ),
  );
}

export function trackAddShippingInfo(
  items: readonly CartItem[],
  shippingTier: string,
): boolean {
  if (items.length === 0) {
    return false;
  }

  return pushToDataLayer(
    createAddShippingInfoEvent(
      DEFAULT_CURRENCY,
      getCartValue(items),
      shippingTier,
      items.map((item) => mapCartItemToAnalyticsItem(item)),
    ),
  );
}

export function trackAddPaymentInfo(
  items: readonly CartItem[],
  paymentType: string,
): boolean {
  if (items.length === 0) {
    return false;
  }

  return pushToDataLayer(
    createAddPaymentInfoEvent(
      DEFAULT_CURRENCY,
      getCartValue(items),
      paymentType,
      items.map((item) => mapCartItemToAnalyticsItem(item)),
    ),
  );
}

export function trackPurchase(order: Order): boolean {
  const transactionId = order.orderNumber.trim();
  if (!transactionId || hasPurchaseBeenEmitted(transactionId)) {
    return false;
  }

  const emitted = pushToDataLayer(
    createPurchaseEvent(
      transactionId,
      order.currency,
      order.total,
      order.shippingTotal,
      order.items.map(mapOrderItemToAnalyticsItem),
    ),
  );

  if (emitted) {
    markPurchaseEmitted(transactionId);
  }
  return emitted;
}

export function trackWishlistChange(
  action: "add" | "remove",
  product: Product,
  variant = getDefaultAnalyticsVariant(product),
): boolean {
  return variant
    ? pushToDataLayer(
        createWishlistEvent(
          action,
          DEFAULT_CURRENCY,
          mapProductToAnalyticsItem(product, variant),
        ),
      )
    : false;
}

export function trackSearch(searchTerm: string): boolean {
  const normalizedTerm = searchTerm.trim().replace(/\s+/g, " ");
  return normalizedTerm
    ? pushToDataLayer(createSearchEvent(normalizedTerm))
    : false;
}

export function trackAuth(
  action: "login" | "sign_up",
  role: UserRole,
): boolean {
  return role === "ADMIN"
    ? false
    : pushToDataLayer(createAuthEvent(action));
}

export function trackPromotion(
  action: "view" | "select",
  promotion: PromotionItem,
): boolean {
  return pushToDataLayer(createPromotionEvent(action, promotion));
}
