import assert from "node:assert/strict";
import test from "node:test";
import { findScents, scoreScent } from "./scentFinder.ts";

const product = (overrides = {}) => ({
  id: "one", slug: "one", name: "One", subtitle: "", description: "",
  fragranceFamily: "Woody Amber", concentration: "Eau de Parfum", gender: null,
  longevity: "Moderate", season: ["autumn"], occasion: ["evening"], images: [], variants: [],
  notes: [{ name: "Cedar", type: "BASE", position: 0 }], collections: [], isFeatured: false,
  isNew: false, isLimited: false, isActive: true, rating: null, reviewCount: 0,
  createdAt: "", updatedAt: "", ...overrides,
});

test("scores real catalogue attributes and returns strongest three matches", () => {
  const profile = { family: "woody", note: "cedar", season: "autumn", occasion: "evening", intensity: "balanced" };
  assert.equal(scoreScent(product(), profile).score, 17);
  const results = findScents([product({ id: "best" }), product({ id: "weak", fragranceFamily: "Floral", notes: [] }), product({ id: "two" }), product({ id: "three" })], profile);
  assert.equal(results.length, 3);
  assert.equal(results[0].score, 17);
  assert.ok(results.every((result) => result.product.id !== "weak"));
});
