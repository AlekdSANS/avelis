import type {
  AddPaymentInfoEvent,
  AddShippingInfoEvent,
  AddToCartEvent,
  AnalyticsItem,
  AuthEvent,
  BeginCheckoutEvent,
  PromotionEvent,
  PromotionItem,
  PurchaseEvent,
  RemoveFromCartEvent,
  SearchEvent,
  SelectItemEvent,
  ViewCartEvent,
  ViewItemEvent,
  ViewItemListEvent,
  WishlistEvent,
} from "./types";

function calculateItemValue(item: AnalyticsItem): number {
  return Math.round(item.price * item.quantity * 100) / 100;
}

export function createViewItemListEvent(
  itemListId: string,
  itemListName: string,
  items: AnalyticsItem[],
): ViewItemListEvent {
  return {
    event: "view_item_list",
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items,
    },
  };
}

export function createSelectItemEvent(
  itemListId: string,
  itemListName: string,
  item: AnalyticsItem,
): SelectItemEvent {
  return {
    event: "select_item",
    ecommerce: {
      item_list_id: itemListId,
      item_list_name: itemListName,
      items: [item],
    },
  };
}

export function createViewItemEvent(
  currency: string,
  item: AnalyticsItem,
): ViewItemEvent {
  return {
    event: "view_item",
    ecommerce: {
      currency,
      value: calculateItemValue(item),
      items: [item],
    },
  };
}

export function createAddToCartEvent(
  currency: string,
  item: AnalyticsItem,
): AddToCartEvent {
  return {
    event: "add_to_cart",
    ecommerce: {
      currency,
      value: calculateItemValue(item),
      items: [item],
    },
  };
}

export function createRemoveFromCartEvent(
  currency: string,
  item: AnalyticsItem,
): RemoveFromCartEvent {
  return {
    event: "remove_from_cart",
    ecommerce: {
      currency,
      value: calculateItemValue(item),
      items: [item],
    },
  };
}

export function createViewCartEvent(
  currency: string,
  value: number,
  items: AnalyticsItem[],
): ViewCartEvent {
  return {
    event: "view_cart",
    ecommerce: { currency, value, items },
  };
}

export function createBeginCheckoutEvent(
  currency: string,
  value: number,
  items: AnalyticsItem[],
): BeginCheckoutEvent {
  return {
    event: "begin_checkout",
    ecommerce: { currency, value, items },
  };
}

export function createAddShippingInfoEvent(
  currency: string,
  value: number,
  shippingTier: string,
  items: AnalyticsItem[],
): AddShippingInfoEvent {
  return {
    event: "add_shipping_info",
    ecommerce: {
      currency,
      value,
      shipping_tier: shippingTier,
      items,
    },
  };
}

export function createAddPaymentInfoEvent(
  currency: string,
  value: number,
  paymentType: string,
  items: AnalyticsItem[],
): AddPaymentInfoEvent {
  return {
    event: "add_payment_info",
    ecommerce: {
      currency,
      value,
      payment_type: paymentType,
      items,
    },
  };
}

export function createPurchaseEvent(
  transactionId: string,
  currency: string,
  value: number,
  shipping: number,
  items: AnalyticsItem[],
): PurchaseEvent {
  return {
    event: "purchase",
    ecommerce: {
      transaction_id: transactionId,
      currency,
      value,
      shipping,
      tax: 0,
      items,
    },
  };
}

export function createWishlistEvent(
  action: "add" | "remove",
  currency: string,
  item: AnalyticsItem,
): WishlistEvent {
  return {
    event: action === "add" ? "add_to_wishlist" : "remove_from_wishlist",
    ecommerce: {
      currency,
      value: calculateItemValue(item),
      items: [item],
    },
  };
}

export function createSearchEvent(searchTerm: string): SearchEvent {
  return { event: "search", search_term: searchTerm };
}

export function createAuthEvent(
  action: "login" | "sign_up",
): AuthEvent {
  return { event: action, method: "email" };
}

export function createPromotionEvent(
  action: "view" | "select",
  promotion: PromotionItem,
): PromotionEvent {
  return {
    event: action === "view" ? "view_promotion" : "select_promotion",
    ecommerce: { items: [promotion] },
  };
}
