import assert from "node:assert/strict";
import test from "node:test";

import { createProductThemeStyle } from "../../products/utils/productTheme.ts";
import { adminProductFormSchema } from "./schemas/adminProductFormSchema.ts";
import { productFormDefaultValues } from "./types.ts";

test("uses the neutral store theme by default", () => {
	const parsed = adminProductFormSchema.parse({
		...productFormDefaultValues,
		name: "Noxwood",
		slug: "noxwood",
		description: "A deep woody composition.",
		fragranceFamily: "Woody",
		concentration: "Eau de Parfum",
		variants: [
			{
				format: "BOTTLE",
				volumeMl: "50",
				price: "389",
				compareAtPrice: "",
				sku: "AVE-NOX-050",
				stock: "5",
			},
		],
	});

	assert.equal(parsed.themeMode, "DEFAULT");
	assert.equal(parsed.themeBackground, "#F2EFE9");
});

test("rejects malformed custom colors", () => {
	const result = adminProductFormSchema.safeParse({
		...productFormDefaultValues,
		themeMode: "CUSTOM",
		themeAccent: "violet",
	});
	assert.equal(result.success, false);
	assert.equal(
		result.error?.issues.some((issue) => issue.path[0] === "themeAccent"),
		true,
	);
});

test("generates readable storefront tokens for dark presets", () => {
	const style = createProductThemeStyle({
		themeMode: "PRESET",
		themePreset: "MIDNIGHT",
		themeBackground: null,
		themeSurface: null,
		themeAccent: null,
	});

	assert.equal(style["--color-bg"], "#17151E");
	assert.equal(style["--color-text"], "#FFF9F2");
	assert.equal(style["--product-accent"], "#AFA0F5");
});
