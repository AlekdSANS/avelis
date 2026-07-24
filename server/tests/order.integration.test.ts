import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { prisma } from "../src/lib/prisma.js";
import { createOrderSchema } from "../src/schemas/orderSchemas.js";
import {
	createOrder,
	getCustomerOrder,
	listCustomerOrders,
} from "../src/services/orderService.js";
import { HttpError } from "../src/utils/httpError.js";

type CheckoutInputOptions = {
	variantId: string;
	quantity?: number;
	email?: string;
	phone?: string;
	shippingMethod?: "STANDARD" | "EXPRESS";
	paymentMethod?: "CARD" | "BLIK" | "CASH_ON_DELIVERY";
	idempotencyKey?: string;
};

function buildCheckoutInput(options: CheckoutInputOptions) {
	return createOrderSchema.parse({
		customer: {
			firstName: "Test",
			lastName: "Customer",
			email: options.email ?? "checkout@example.com",
			phone: options.phone ?? "+48123456789",
		},
		shippingAddress: {
			country: "PL",
			city: "Wroclaw",
			postalCode: "50-001",
			street: "Test Street",
			building: "12",
			apartment: "4",
			deliveryNotes: "Integration test order",
		},
		shippingMethod: options.shippingMethod ?? "STANDARD",
		paymentMethod: options.paymentMethod ?? "CARD",
		items: [
			{
				variantId: options.variantId,
				quantity: options.quantity ?? 1,
			},
		],
		...(options.idempotencyKey === undefined
			? {}
			: { idempotencyKey: options.idempotencyKey }),
	});
}

async function expectHttpError(
	promise: Promise<unknown>,
	statusCode: number,
) {
	await assert.rejects(promise, (error: unknown) => {
		assert.ok(error instanceof HttpError);
		assert.equal(error.statusCode, statusCode);
		return true;
	});
}

test("order backend flow", async (t) => {
	const tag = randomUUID();
	const testEmail = (label: string) => `${label}-${tag}@example.com`;
	const userA = await prisma.user.create({
		data: {
			firstName: "Order",
			lastName: "Owner",
			email: testEmail("owner"),
			passwordHash: "integration-test-password-hash",
		},
		select: {
			id: true,
			email: true,
		},
	});
	const userB = await prisma.user.create({
		data: {
			firstName: "Other",
			lastName: "Customer",
			email: testEmail("other"),
			passwordHash: "integration-test-password-hash",
		},
		select: {
			id: true,
			email: true,
		},
	});
	const activeProduct = await prisma.product.create({
		data: {
			slug: `checkout-active-${tag}`,
			name: "Checkout Test Fragrance",
			description: "Temporary integration test product",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			images: {
				create: {
					url: `/test/${tag}/main.webp`,
					alt: "Checkout integration test",
					isPrimary: true,
					imageType: "MAIN",
				},
			},
			variants: {
				create: [
					{
						format: "BOTTLE",
						volumeMl: 50,
						price: "100.00",
						sku: `TEST-MAIN-${tag}`,
						stock: 50,
					},
					{
						format: "BOTTLE",
						volumeMl: 100,
						price: "150.00",
						sku: `TEST-IDEM-${tag}`,
						stock: 10,
					},
					{
						format: "BOTTLE",
						volumeMl: 200,
						price: "75.00",
						sku: `TEST-RACE-${tag}`,
						stock: 1,
					},
					{
						format: "BOTTLE",
						volumeMl: 250,
						price: "50.00",
						sku: `TEST-LOW-${tag}`,
						stock: 1,
					},
				],
			},
		},
		select: {
			id: true,
			slug: true,
			name: true,
			variants: {
				select: {
					id: true,
					volumeMl: true,
					sku: true,
					stock: true,
				},
			},
		},
	});
	const inactiveProduct = await prisma.product.create({
		data: {
			slug: `checkout-inactive-${tag}`,
			name: "Inactive Checkout Test Fragrance",
			description: "Temporary inactive integration test product",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			isActive: false,
			variants: {
				create: {
					format: "BOTTLE",
					volumeMl: 50,
					price: "80.00",
					sku: `TEST-INACTIVE-${tag}`,
					stock: 5,
				},
			},
		},
		select: {
			id: true,
			variants: {
				select: {
					id: true,
					stock: true,
				},
			},
		},
	});

	const variantByVolume = new Map(
		activeProduct.variants.map((variant) => [variant.volumeMl, variant]),
	);
	const mainVariant = variantByVolume.get(50);
	const idempotencyVariant = variantByVolume.get(100);
	const raceVariant = variantByVolume.get(200);
	const lowStockVariant = variantByVolume.get(250);
	const inactiveVariant = inactiveProduct.variants[0];

	assert.ok(mainVariant);
	assert.ok(idempotencyVariant);
	assert.ok(raceVariant);
	assert.ok(lowStockVariant);
	assert.ok(inactiveVariant);

	try {
		await t.test(
			"creates an authenticated order from server-owned values and snapshots",
			async () => {
				const parsed = createOrderSchema.parse({
					...buildCheckoutInput({
						variantId: mainVariant.id,
						quantity: 2,
						email: testEmail("authenticated-order"),
					}),
					userId: userB.id,
					status: "DELIVERED",
					paymentStatus: "PAID",
					subtotal: 0.01,
					shippingTotal: 0,
					total: 0.01,
					items: [
						{
							variantId: mainVariant.id,
							quantity: 2,
							unitPrice: 0.01,
							productName: "Tampered product",
						},
					],
				});

				assert.equal("userId" in parsed, false);
				assert.equal("total" in parsed, false);
				assert.equal("unitPrice" in parsed.items[0], false);

				const result = await createOrder(parsed, userA.id);
				const item = result.data.items[0];

				assert.equal(result.replayed, false);
				assert.equal(result.data.status, "PENDING_PAYMENT");
				assert.equal(result.data.paymentStatus, "PENDING");
				assert.equal(result.data.subtotal, 200);
				assert.equal(result.data.shippingTotal, 19);
				assert.equal(result.data.discountTotal, 0);
				assert.equal(result.data.total, 219);
				assert.equal(result.data.currency, "PLN");
				assert.match(
					result.data.orderNumber,
					/^AVELIS-\d{8}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/,
				);
				assert.ok(item);
				assert.equal(item.productName, activeProduct.name);
				assert.equal(item.productSlug, activeProduct.slug);
				assert.equal(item.sku, mainVariant.sku);
				assert.equal(item.format, "BOTTLE");
				assert.equal(item.volumeMl, 50);
				assert.equal(item.unitPrice, 100);
				assert.equal(item.lineTotal, 200);
				assert.equal(item.imageUrl, `/test/${tag}/main.webp`);

				const persistedOrder = await prisma.order.findUniqueOrThrow({
					where: {
						id: result.data.id,
					},
					select: {
						userId: true,
						status: true,
						paymentStatus: true,
						idempotencyKey: true,
					},
				});
				const persistedVariant = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: mainVariant.id,
					},
					select: {
						stock: true,
					},
				});

				assert.equal(persistedOrder.userId, userA.id);
				assert.equal(persistedOrder.status, "PENDING_PAYMENT");
				assert.equal(persistedOrder.paymentStatus, "PENDING");
				assert.equal(persistedOrder.idempotencyKey, null);
				assert.equal(persistedVariant.stock, 48);
			},
		);

		await t.test("creates a guest order without user ownership", async () => {
			const result = await createOrder(
				buildCheckoutInput({
					variantId: mainVariant.id,
					email: testEmail("guest-order"),
					shippingMethod: "EXPRESS",
					paymentMethod: "BLIK",
				}),
				null,
			);
			const persistedOrder = await prisma.order.findUniqueOrThrow({
				where: {
					id: result.data.id,
				},
				select: {
					userId: true,
					paymentMethod: true,
					shippingMethod: true,
				},
			});

			assert.equal(result.data.shippingTotal, 39);
			assert.equal(result.data.total, 139);
			assert.equal(persistedOrder.userId, null);
			assert.equal(persistedOrder.paymentMethod, "BLIK");
			assert.equal(persistedOrder.shippingMethod, "EXPRESS");
		});

		await t.test("rejects an empty item list", () => {
			const result = createOrderSchema.safeParse({
				...buildCheckoutInput({
					variantId: mainVariant.id,
				}),
				items: [],
			});

			assert.equal(result.success, false);
		});

		await t.test(
			"rejects missing, inactive, and insufficient-stock variants without mutation",
			async () => {
				const lowStockBefore = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: lowStockVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const inactiveBefore = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: inactiveVariant.id,
					},
					select: {
						stock: true,
					},
				});

				await expectHttpError(
					createOrder(
						buildCheckoutInput({
							variantId: `missing-${tag}`,
							email: testEmail("missing"),
						}),
						null,
					),
					400,
				);
				await expectHttpError(
					createOrder(
						buildCheckoutInput({
							variantId: inactiveVariant.id,
							email: testEmail("inactive"),
						}),
						null,
					),
					409,
				);
				await expectHttpError(
					createOrder(
						buildCheckoutInput({
							variantId: lowStockVariant.id,
							quantity: 2,
							email: testEmail("insufficient"),
						}),
						null,
					),
					409,
				);

				const lowStockAfter = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: lowStockVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const inactiveAfter = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: inactiveVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const failedOrderCount = await prisma.order.count({
					where: {
						customerEmail: {
							in: [
								testEmail("missing"),
								testEmail("inactive"),
								testEmail("insufficient"),
							],
						},
					},
				});

				assert.equal(lowStockAfter.stock, lowStockBefore.stock);
				assert.equal(inactiveAfter.stock, inactiveBefore.stock);
				assert.equal(failedOrderCount, 0);
			},
		);

		await t.test(
			"prevents duplicate authenticated and guest submissions",
			async () => {
				const authenticatedKey = randomUUID();
				const authenticatedInput = buildCheckoutInput({
					variantId: idempotencyVariant.id,
					email: testEmail("idempotent-auth"),
					idempotencyKey: authenticatedKey,
				});
				const stockBefore = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: idempotencyVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const first = await createOrder(authenticatedInput, userA.id);
				const replay = await createOrder(authenticatedInput, userA.id);
				const stockAfter = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: idempotencyVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const authenticatedOrderCount = await prisma.order.count({
					where: {
						idempotencyKey: authenticatedKey,
					},
				});

				assert.equal(first.data.id, replay.data.id);
				assert.equal(first.replayed, false);
				assert.equal(replay.replayed, true);
				assert.equal(authenticatedOrderCount, 1);
				assert.equal(stockAfter.stock, stockBefore.stock - 1);

				const guestKey = randomUUID();
				const guestInput = buildCheckoutInput({
					variantId: idempotencyVariant.id,
					email: testEmail("idempotent-guest"),
					idempotencyKey: guestKey,
				});

				await createOrder(guestInput, null);
				await expectHttpError(createOrder(guestInput, null), 409);
				assert.equal(
					await prisma.order.count({
						where: {
							idempotencyKey: guestKey,
						},
					}),
					1,
				);
			},
		);

		await t.test(
			"uses conditional stock updates to prevent concurrent overselling",
			async () => {
				const firstEmail = testEmail("race-first");
				const secondEmail = testEmail("race-second");
				const outcomes = await Promise.allSettled([
					createOrder(
						buildCheckoutInput({
							variantId: raceVariant.id,
							email: firstEmail,
							idempotencyKey: randomUUID(),
						}),
						null,
					),
					createOrder(
						buildCheckoutInput({
							variantId: raceVariant.id,
							email: secondEmail,
							idempotencyKey: randomUUID(),
						}),
						null,
					),
				]);
				const successes = outcomes.filter(
					(result) => result.status === "fulfilled",
				);
				const failures = outcomes.filter(
					(result) => result.status === "rejected",
				);
				const variantAfter = await prisma.productVariant.findUniqueOrThrow({
					where: {
						id: raceVariant.id,
					},
					select: {
						stock: true,
					},
				});
				const createdOrderCount = await prisma.order.count({
					where: {
						customerEmail: {
							in: [firstEmail, secondEmail],
						},
					},
				});

				assert.equal(successes.length, 1);
				assert.equal(failures.length, 1);
				assert.equal(variantAfter.stock, 0);
				assert.equal(createdOrderCount, 1);
			},
		);

		await t.test(
			"lists only owned orders and hides another user's detail",
			async () => {
				const otherOrder = await createOrder(
					buildCheckoutInput({
						variantId: mainVariant.id,
						email: testEmail("other-user-order"),
					}),
					userB.id,
				);
				const ownerOrders = await listCustomerOrders(userA.id, {
					page: 1,
					limit: 50,
				});
				const filteredOwnerOrders = await listCustomerOrders(userA.id, {
					status: "PENDING_PAYMENT",
					page: 1,
					limit: 50,
				});

				assert.ok(ownerOrders.data.length >= 2);
				assert.equal(
					ownerOrders.data.some(
						(order) => order.id === otherOrder.data.id,
					),
					false,
				);
				assert.equal(
					filteredOwnerOrders.data.every(
						(order) => order.status === "PENDING_PAYMENT",
					),
					true,
				);

				await expectHttpError(
					getCustomerOrder(userA.id, otherOrder.data.orderNumber),
					404,
				);
				const ownedDetail = await getCustomerOrder(
					userB.id,
					otherOrder.data.orderNumber,
				);
				const serialized = JSON.stringify(ownedDetail);

				assert.equal(ownedDetail.data.id, otherOrder.data.id);
				assert.equal(serialized.includes("passwordHash"), false);
				assert.equal(serialized.includes("session"), false);
				assert.equal(serialized.includes("idempotencyKey"), false);
				assert.equal(serialized.includes("guestAccessTokenHash"), false);
			},
		);
	} finally {
		await prisma.order.deleteMany({
			where: {
				customerEmail: {
					contains: tag,
				},
			},
		});
		await prisma.product.deleteMany({
			where: {
				id: {
					in: [activeProduct.id, inactiveProduct.id],
				},
			},
		});
		await prisma.user.deleteMany({
			where: {
				id: {
					in: [userA.id, userB.id],
				},
			},
		});
	}
});
