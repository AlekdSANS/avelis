export type AnalyticsItem = {
  item_id: string;
  item_name: string;
  item_brand: "AVELIS";
  item_category?: string;
  item_category2?: string;
  item_category3?: "Bottle" | "Refill";
  item_variant?: string;
  price: number;
  quantity: number;
  item_list_id?: string;
  item_list_name?: string;
  index?: number;
};

export type AnalyticsListContext = {
  itemListId: string;
  itemListName: string;
  itemIndex?: number;
};

export type EcommercePayload = {
  currency?: string;
  value?: number;
  items: AnalyticsItem[];
};

export interface ViewItemListEvent {
  event: "view_item_list";
  ecommerce: EcommercePayload & {
    item_list_id: string;
    item_list_name: string;
  };
}

export interface SelectItemEvent {
  event: "select_item";
  ecommerce: EcommercePayload & {
    item_list_id: string;
    item_list_name: string;
  };
}

export interface ViewItemEvent {
  event: "view_item";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface AddToCartEvent {
  event: "add_to_cart";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface RemoveFromCartEvent {
  event: "remove_from_cart";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface ViewCartEvent {
  event: "view_cart";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface BeginCheckoutEvent {
  event: "begin_checkout";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface AddShippingInfoEvent {
  event: "add_shipping_info";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
    shipping_tier: string;
  };
}

export interface AddPaymentInfoEvent {
  event: "add_payment_info";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
    payment_type: string;
  };
}

export interface PurchaseEvent {
  event: "purchase";
  ecommerce: EcommercePayload & {
    transaction_id: string;
    currency: string;
    value: number;
    shipping: number;
    tax: number;
  };
}

export interface WishlistEvent {
  event: "add_to_wishlist" | "remove_from_wishlist";
  ecommerce: EcommercePayload & {
    currency: string;
    value: number;
  };
}

export interface SearchEvent {
  event: "search";
  search_term: string;
}

export interface AuthEvent {
  event: "login" | "sign_up";
  method: "email";
}

export type PromotionItem = {
  promotion_id: string;
  promotion_name: string;
  creative_name?: string;
  creative_slot?: string;
};

export interface PromotionEvent {
  event: "view_promotion" | "select_promotion";
  ecommerce: {
    items: PromotionItem[];
  };
}

export type EcommerceEvent =
  | ViewItemListEvent
  | SelectItemEvent
  | ViewItemEvent
  | AddToCartEvent
  | RemoveFromCartEvent
  | ViewCartEvent
  | BeginCheckoutEvent
  | AddShippingInfoEvent
  | AddPaymentInfoEvent
  | PurchaseEvent
  | WishlistEvent
  | PromotionEvent;

export type AnalyticsEvent = EcommerceEvent | SearchEvent | AuthEvent;

export type GoogleTagManagerBootstrapEvent = {
  "gtm.start": number;
  event: "gtm.js";
};

export type DataLayerEntry =
  | AnalyticsEvent
  | GoogleTagManagerBootstrapEvent
  | { ecommerce: null };
