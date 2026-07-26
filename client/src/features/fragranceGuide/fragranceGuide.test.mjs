import assert from "node:assert/strict";
import test from "node:test";

import {
  getAvailableGuideFamilies,
  getFamilyNotes,
  getFormatVolumes,
  getNotesByLayer,
} from "./utils/guideCatalogue.ts";
import { buildGuideShopHref } from "./utils/shopLinks.ts";

function product({
  family,
  id,
  notes,
  variants,
}) {
  return {
    id,
    slug: id,
    name: id,
    subtitle: "",
    description: "",
    fragranceFamily: family,
    concentration: "Eau de Parfum",
    gender: null,
    longevity: null,
    season: [],
    occasion: [],
    images: [],
    variants,
    notes,
    collections: [],
    isFeatured: false,
    isNew: false,
    isLimited: false,
    isActive: true,
    rating: null,
    reviewCount: 0,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

const catalogue = [
  product({
    family: "Woody Amber",
    id: "redwood",
    notes: [
      { name: "saffron", type: "TOP", position: 0 },
      { name: "cedarwood", type: "HEART", position: 0 },
      { name: "smoked amber", type: "BASE", position: 0 },
    ],
    variants: [
      { id: "b-50", format: "BOTTLE", volumeMl: 50, price: 1, compareAtPrice: null, sku: "B-50", stock: 1 },
      { id: "r-100", format: "REFILL", volumeMl: 100, price: 1, compareAtPrice: null, sku: "R-100", stock: 1 },
    ],
  }),
  product({
    family: "Aquatic Floral",
    id: "tidal-veil",
    notes: [
      { name: "neroli", type: "TOP", position: 0 },
      { name: "jasmine sambac", type: "HEART", position: 0 },
      { name: "white musk", type: "BASE", position: 0 },
    ],
    variants: [
      { id: "b-100", format: "BOTTLE", volumeMl: 100, price: 1, compareAtPrice: null, sku: "B-100", stock: 1 },
      { id: "r-150", format: "REFILL", volumeMl: 150, price: 1, compareAtPrice: null, sku: "R-150", stock: 1 },
    ],
  }),
];

test("builds shareable Shop URLs using the catalogue's real query keys", () => {
  assert.equal(buildGuideShopHref(), "/shop");
  assert.equal(
    buildGuideShopHref({ family: "Woody", note: "white musk" }),
    "/shop?family=Woody&note=white+musk",
  );
  assert.equal(
    buildGuideShopHref({
      concentration: "Eau de Parfum",
      format: "REFILL",
    }),
    "/shop?concentration=Eau+de+Parfum&format=REFILL",
  );
});

test("derives available guide families and their notes from real products", () => {
  assert.deepEqual(
    getAvailableGuideFamilies(catalogue).map((family) => family.name),
    ["Woody", "Floral", "Amber", "Aquatic"],
  );
  assert.deepEqual(
    getFamilyNotes(catalogue, "Woody").map((note) => note.label),
    ["Cedarwood", "Saffron", "Smoked Amber"],
  );
});

test("groups notes by layer and derives format sizes without duplicates", () => {
  assert.deepEqual(
    getNotesByLayer(catalogue, "TOP").map((note) => note.name),
    ["neroli", "saffron"],
  );
  assert.deepEqual(getFormatVolumes(catalogue, "BOTTLE"), [50, 100]);
  assert.deepEqual(getFormatVolumes(catalogue, "REFILL"), [100, 150]);
});
