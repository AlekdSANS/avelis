import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { prisma } from "../src/lib/prisma.js";
import {
	getContinuity,
	mergeContinuity,
	replaceCart,
	replaceWishlist,
} from "../src/services/continuityService.js";
import { validatePromotion } from "../src/services/merchandisingService.js";

test("customer continuity merges anonymous state and remains server-backed", async () => {
	const tag = randomUUID();
	const user = await prisma.user.create({
		data: {
			firstName: "Continuity",
			lastName: "Customer",
			email: `continuity-${tag}@example.com`,
			passwordHash: "integration-test-password-hash",
		},
		select: { id: true },
	});
	const product = await prisma.product.create({
		data: {
			slug: `continuity-${tag}`,
			name: "Continuity Test Fragrance",
			description: "Temporary account continuity fixture",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			variants: {
				create: {
					format: "BOTTLE",
					volumeMl: 50,
					price: "120.00",
					sku: `CONTINUITY-${tag}`,
					stock: 6,
				},
			},
		},
		select: { id: true, variants: { select: { id: true } } },
	});
	const variantId = product.variants[0]?.id;
	assert.ok(variantId);

	try {
		await replaceCart(user.id, { items: [{ variantId, quantity: 2 }] });
		await replaceWishlist(user.id, { productIds: [product.id] });

		const merged = await mergeContinuity(user.id, {
			cartItems: [{ variantId, quantity: 3 }],
			wishlistProductIds: [product.id],
		});
		assert.equal(merged.data.cart.items.length, 1);
		assert.equal(merged.data.cart.items[0]?.quantity, 5);
		assert.equal(merged.data.cart.totalQuantity, 5);
		assert.equal(merged.data.wishlist.length, 1);

		await replaceCart(user.id, { items: [{ variantId, quantity: 4 }] });
		const reloaded = await getContinuity(user.id);
		assert.equal(reloaded.data.cart.items[0]?.quantity, 4);
		assert.equal(reloaded.data.wishlist[0]?.id, product.id);
	} finally {
		await prisma.user.delete({ where: { id: user.id } });
		await prisma.product.delete({ where: { id: product.id } });
	}
});

test("the seeded portfolio promotion is validated by the server", async () => {
	const result = await validatePromotion("welcome10", 300);
	assert.equal(result.data.code, "WELCOME10");
	assert.equal(result.data.discount, 30);
});
