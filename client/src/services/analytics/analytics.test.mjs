import assert from "node:assert/strict";
import test from "node:test";

import {
  mapOrderItemToAnalyticsItem,
  mapProductToAnalyticsItem,
} from "./ecommerceMapper.ts";
import {
  createAddPaymentInfoEvent,
  createAddShippingInfoEvent,
  createAddToCartEvent,
  createBeginCheckoutEvent,
  createPurchaseEvent,
  createViewItemListEvent,
} from "./events.ts";
import {
  hasPurchaseBeenEmitted,
  markPurchaseEmitted,
} from "./purchaseDeduplication.ts";
import {
  canEmitAnalytics,
  isAdminRoute,
} from "./policy.ts";

const product = {
  name: "Nocturne",
  fragranceFamily: "Woody",
  concentration: "Eau de Parfum",
};
const bottle = {
  sku: "AVE-NOC-B-50",
  format: "BOTTLE",
  volumeMl: 50,
  price: 349.9,
};
const refill = {
  sku: "AVE-NOC-R-100",
  format: "REFILL",
  volumeMl: 100,
  price: 499,
};

test("maps AVELIS Bottle and Refill variants without database IDs", () => {
  const bottleItem = mapProductToAnalyticsItem(
    product,
    bottle,
    2,
    {
      itemListId: "shop_catalogue",
      itemListName: "Shop catalogue",
      itemIndex: 0,
    },
  );
  const refillItem = mapProductToAnalyticsItem(product, refill);

  assert.deepEqual(bottleItem, {
    item_id: "AVE-NOC-B-50",
    item_name: "Nocturne",
    item_brand: "AVELIS",
    item_category: "Woody",
    item_category2: "Eau de Parfum",
    item_category3: "Bottle",
    item_variant: "50 ml",
    price: 349.9,
    quantity: 2,
    item_list_id: "shop_catalogue",
    item_list_name: "Shop catalogue",
    index: 0,
  });
  assert.equal(refillItem.item_category3, "Refill");
  assert.equal("id" in bottleItem, false);
});

test("builds list, cart, and checkout values from typed items", () => {
  const item = mapProductToAnalyticsItem(product, bottle, 2);
  const listEvent = createViewItemListEvent(
    "shop_catalogue",
    "Shop catalogue",
    [item],
  );
  const addEvent = createAddToCartEvent("PLN", item);
  const checkoutEvent = createBeginCheckoutEvent("PLN", 699.8, [item]);

  assert.equal(listEvent.event, "view_item_list");
  assert.equal(listEvent.ecommerce.items.length, 1);
  assert.equal(addEvent.ecommerce.value, 699.8);
  assert.equal(checkoutEvent.ecommerce.value, 699.8);
});

test("uses stable shipping and payment labels without personal data", () => {
  const item = mapProductToAnalyticsItem(product, bottle);
  const shippingEvent = createAddShippingInfoEvent(
    "PLN",
    349.9,
    "Express delivery",
    [item],
  );
  const paymentEvent = createAddPaymentInfoEvent(
    "PLN",
    349.9,
    "BLIK",
    [item],
  );

  assert.equal(shippingEvent.ecommerce.shipping_tier, "Express delivery");
  assert.equal(paymentEvent.ecommerce.payment_type, "BLIK");
  assert.equal(JSON.stringify([shippingEvent, paymentEvent]).includes("email"), false);
  assert.equal(JSON.stringify([shippingEvent, paymentEvent]).includes("address"), false);
});

test("maps purchase snapshots and preserves backend-authoritative totals", () => {
  const orderItem = mapOrderItemToAnalyticsItem({
    sku: "AVE-NOC-R-100",
    productName: "Nocturne",
    format: "REFILL",
    volumeMl: 100,
    unitPrice: 499,
    quantity: 2,
  });
  const purchaseEvent = createPurchaseEvent(
    "AVE-2026-0001",
    "PLN",
    1017,
    19,
    [orderItem],
  );

  assert.equal(purchaseEvent.ecommerce.transaction_id, "AVE-2026-0001");
  assert.equal(purchaseEvent.ecommerce.value, 1017);
  assert.equal(purchaseEvent.ecommerce.shipping, 19);
  assert.equal(purchaseEvent.ecommerce.tax, 0);
  assert.equal(purchaseEvent.ecommerce.items[0].item_id, "AVE-NOC-R-100");
});

test("deduplicates purchases in sessionStorage using only transaction IDs", () => {
  const storage = new Map();
  globalThis.window = {
    sessionStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  };

  assert.equal(hasPurchaseBeenEmitted("AVE-2026-0099"), false);
  markPurchaseEmitted("AVE-2026-0099");
  assert.equal(hasPurchaseBeenEmitted("AVE-2026-0099"), true);

  const storedValue = [...storage.values()][0];
  assert.deepEqual(JSON.parse(storedValue), ["AVE-2026-0099"]);
});

test("excludes admin routes and keeps disabled or unconsented analytics off", () => {
  assert.equal(isAdminRoute("/admin"), true);
  assert.equal(isAdminRoute("/admin/orders/AVE-2026-0001"), true);
  assert.equal(isAdminRoute("/shop"), false);
  assert.equal(
    canEmitAnalytics({
      analyticsEnabled: false,
      consentGranted: true,
      pathname: "/shop",
    }),
    false,
  );
  assert.equal(
    canEmitAnalytics({
      analyticsEnabled: true,
      consentGranted: false,
      pathname: "/shop",
    }),
    false,
  );
  assert.equal(
    canEmitAnalytics({
      analyticsEnabled: true,
      consentGranted: true,
      pathname: "/admin/products",
    }),
    false,
  );
  assert.equal(
    canEmitAnalytics({
      analyticsEnabled: true,
      consentGranted: true,
      pathname: "/products/nocturne",
    }),
    true,
  );
});
