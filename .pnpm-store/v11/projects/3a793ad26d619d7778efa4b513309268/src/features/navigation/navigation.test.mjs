import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { informationPages } from "../../pages/InformationPage/informationPages.ts";

const routerSource = readFileSync(
  new URL("../../app/router.tsx", import.meta.url),
  "utf8",
);
const footerSource = readFileSync(
  new URL("../../components/common/Footer/Footer.tsx", import.meta.url),
  "utf8",
);
const checkoutSource = readFileSync(
  new URL("../../pages/CheckoutPage/CheckoutPage.tsx", import.meta.url),
  "utf8",
);

test("every informational footer destination has a substantive public page", () => {
  const pagePaths = [
    "/contact",
    "/delivery-returns",
    "/faq",
    "/materials",
    "/journal",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  assert.equal(Object.keys(informationPages).length, pagePaths.length);

  for (const path of pagePaths) {
    assert.match(footerSource, new RegExp(`to: "${path}"`));
    assert.match(routerSource, new RegExp(`path: "${path}"`));
  }

  for (const page of Object.values(informationPages)) {
    assert.ok(page.intro.length > 80);
    assert.ok(page.sections.length >= 3);
    assert.ok(page.sections.every((section) => section.paragraphs.length > 0));
  }
});

test("checkout exposes the operational policies before order submission", () => {
  for (const path of [
    "/terms",
    "/privacy",
    "/delivery-returns",
    "/faq",
    "/contact",
  ]) {
    assert.match(checkoutSource, new RegExp(`to="${path}"`));
  }

  assert.doesNotMatch(
    JSON.stringify(informationPages),
    /not a launch-ready legal notice|insert the real controller identity/i,
  );
});

test("search is connected to products, collections and the full Shop query", () => {
  const searchSource = readFileSync(
    new URL("../../components/common/SearchOverlay/SearchOverlay.tsx", import.meta.url),
    "utf8",
  );

  assert.match(searchSource, /useProducts/);
  assert.match(searchSource, /useCollections/);
  assert.match(searchSource, /\/shop\?search=/);
  assert.doesNotMatch(searchSource, /once fragrance search is connected/i);
});

test("account navigation returns to the storefront and storefront routes reset scroll", () => {
  const accountLayoutSource = readFileSync(
    new URL("../../layouts/AccountLayout/AccountLayout.tsx", import.meta.url),
    "utf8",
  );
  const storeLayoutSource = readFileSync(
    new URL("../../layouts/StoreLayout/StoreLayout.tsx", import.meta.url),
    "utf8",
  );

  assert.match(accountLayoutSource, /Back to storefront/);
  assert.match(accountLayoutSource, /to="\/"/);
  assert.match(storeLayoutSource, /window\.scrollTo/);
  assert.match(storeLayoutSource, /\[pathname\]/);
});

test("checkout and account history preserve one order container with nested items", () => {
  const orderRepositorySource = readFileSync(
    new URL("../../../../server/src/repositories/orderRepository.ts", import.meta.url),
    "utf8",
  );
  const orderMapperSource = readFileSync(
    new URL("../../../../server/src/utils/orderMapper.ts", import.meta.url),
    "utf8",
  );
  const ordersPageSource = readFileSync(
    new URL("../../pages/OrdersPage/OrdersPage.tsx", import.meta.url),
    "utf8",
  );

  assert.match(orderRepositorySource, /items:\s*\{\s*create:\s*lineItems\.map/);
  assert.match(orderMapperSource, /itemPreviews:\s*order\.items\.map/);
  assert.match(ordersPageSource, /Grouped in this order/);
});
