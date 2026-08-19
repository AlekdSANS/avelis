import assert from "node:assert/strict";
import test from "node:test";
import {
	adminCollectionFormSchema,
	createCollectionSlug,
} from "./schemas/adminCollectionFormSchema.ts";

const draftValues = {
	name: "Bluewood",
	slug: "bluewood",
	eyebrow: "",
	shortDescription: "",
	description: "Cool woods, mineral air and quiet depth.",
	heroImageUrl: "",
	cardImageUrl: "",
	mobileImageUrl: "",
	accentColor: "#aabbcc",
	status: "DRAFT",
	isFeatured: false,
	sortOrder: 10,
	seoTitle: "",
	seoDescription: "",
	storyHeadline: "",
	storyBody: "",
	storyImageUrl: "",
	materialNotes: "",
	campaignLabel: "",
	productIds: [],
};

test("normalizes collection slugs for the editor", () => {
	assert.equal(createCollectionSlug("  Błękit & Woods  "), "blekit-woods");
	assert.equal(createCollectionSlug("Night’s Reserve"), "nights-reserve");
});

test("allows incomplete drafts but validates publishing requirements", () => {
	assert.equal(adminCollectionFormSchema.safeParse(draftValues).success, true);

	const invalidPublished = adminCollectionFormSchema.safeParse({
		...draftValues,
		status: "PUBLISHED",
	});
	assert.equal(invalidPublished.success, false);
	assert.equal(
		invalidPublished.error?.issues.some(
			(issue) => issue.path.join(".") === "heroImageUrl",
		),
		true,
	);
	assert.equal(
		invalidPublished.error?.issues.some(
			(issue) => issue.path.join(".") === "productIds",
		),
		true,
	);

	const validPublished = adminCollectionFormSchema.safeParse({
		...draftValues,
		status: "PUBLISHED",
		cardImageUrl: "/uploads/products/example.webp",
		productIds: ["product-1"],
	});
	assert.equal(validPublished.success, true);
});
