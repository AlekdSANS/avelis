import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  brandPrinciples,
  formatDetails,
  materialDetails,
  scentAndFormSteps,
} from "./data/aboutContent.ts";
import { selectAboutCollections } from "./utils/selectAboutCollections.ts";

function makeCollection(id, isFeatured = false) {
  return {
    id,
    slug: `collection-${id}`,
    name: `Collection ${id}`,
    eyebrow: null,
    shortDescription: null,
    description: "A collection.",
    heroImageUrl: null,
    cardImageUrl: null,
    mobileImageUrl: null,
    accentColor: null,
    isFeatured,
    productCount: 1,
  };
}

test("About content covers the complete philosophy without unsupported history", () => {
  assert.equal(scentAndFormSteps.length, 3);
  assert.equal(materialDetails.length, 4);
  assert.equal(brandPrinciples.length, 5);

  const completeCopy = JSON.stringify({
    brandPrinciples,
    formatDetails,
    materialDetails,
    scentAndFormSteps,
  });

  assert.doesNotMatch(completeCopy, /\bfounder\b/i);
  assert.doesNotMatch(completeCopy, /\bsince\s+\d{4}\b/i);
  assert.doesNotMatch(completeCopy, /\bcertified\b/i);
});

test("Bottle and refill actions use supported Shop filters and catalogue sizes", () => {
  assert.deepEqual(
    formatDetails.map(({ sizes, to }) => ({ sizes, to })),
    [
      { sizes: "50 ml · 100 ml", to: "/shop?format=BOTTLE" },
      { sizes: "100 ml · 150 ml", to: "/shop?format=REFILL" },
    ],
  );
});

test("featured collection selection prioritizes featured content and stays stable", () => {
  const collections = [
    makeCollection("one"),
    makeCollection("two"),
    makeCollection("three", true),
    makeCollection("four"),
  ];
  const originalOrder = collections.map(({ id }) => id);
  const selected = selectAboutCollections(collections);

  assert.deepEqual(
    selected.map(({ id }) => id),
    ["three", "one", "two"],
  );
  assert.deepEqual(
    collections.map(({ id }) => id),
    originalOrder,
  );
  assert.deepEqual(selectAboutCollections([]), []);
});

test("/about renders the real page and hero actions target public routes", () => {
  const routerSource = readFileSync(
    new URL("../../app/router.tsx", import.meta.url),
    "utf8",
  );
  const heroSource = readFileSync(
    new URL("./components/AboutHero.tsx", import.meta.url),
    "utf8",
  );
  const aboutRoute = routerSource.match(
    /\{\s*path:\s*"\/about",[\s\S]*?\n\s*\},/,
  )?.[0];

  assert.ok(aboutRoute);
  assert.match(aboutRoute, /element:\s*<AboutPage\s*\/>/);
  assert.doesNotMatch(aboutRoute, /PlaceholderPage/);
  assert.match(heroSource, /to="\/collections"/);
  assert.match(heroSource, /to="\/shop"/);
  assert.doesNotMatch(heroSource, /Explore fragrances\s*·\s*View collections/);
});
