import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { prisma } from "../src/lib/prisma.js";
import { adminOrderListQuerySchema } from "../src/schemas/adminOrderSchemas.js";
import {
	getAdminOrder,
	listAdminOrders,
	setAdminOrderStatus,
	setAdminPaymentStatus,
} from "../src/services/adminOrderService.js";
import { HttpError } from "../src/utils/httpError.js";

async function expectHttpError(
	promise: Promise<unknown>,
	statusCode: number,
	message?: RegExp,
) {
	await assert.rejects(promise, (error: unknown) => {
		assert.ok(error instanceof HttpError);
		assert.equal(error.statusCode, statusCode);
		if (message !== undefined) {
			assert.match(error.message, message);
		}
		return true;
	});
}

test("admin order management", async (t) => {
	const tag = randomUUID();
	const email = `admin-orders-${tag}@example.com`;
	const user = await prisma.user.create({
		data: {
			firstName: "Admin",
			lastName: "Order Customer",
			email,
			passwordHash: "integration-test-password-hash",
		},
		select: { id: true },
	});
	const product = await prisma.product.create({
		data: {
			slug: `admin-order-product-${tag}`,
			name: "Admin Order Product",
			description: "Temporary admin order integration product",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			variants: {
				create: {
					format: "BOTTLE",
					volumeMl: 50,
					price: "200.00",
					sku: `ADMIN-ORDER-${tag}`,
					stock: 7,
				},
			},
		},
		select: {
			id: true,
			slug: true,
			name: true,
			variants: {
				select: {
					id: true,
					sku: true,
				},
			},
		},
	});
	const variant = product.variants[0];
	assert.ok(variant);

	const buildOrderData = (orderNumber: string) => ({
		orderNumber,
		userId: user.id,
		customerEmail: email,
		customerFirstName: "Admin",
		customerLastName: "Order Customer",
		customerPhone: "+48123456789",
		shippingCountry: "PL",
		shippingCity: "Warsaw",
		shippingPostalCode: "00-001",
		shippingStreet: "Snapshot Street",
		shippingBuilding: "12",
		shippingApartment: "3",
		deliveryNotes: "Leave with reception",
		shippingMethod: "STANDARD" as const,
		paymentMethod: "CARD" as const,
		paymentStatus: "PENDING" as const,
		status: "PENDING_PAYMENT" as const,
		subtotal: "200.00",
		shippingTotal: "19.00",
		discountTotal: "0.00",
		total: "219.00",
		currency: "PLN",
		idempotencyScope: `admin-order-test:${tag}`,
		idempotencyKey: randomUUID(),
		items: {
			create: {
				productId: product.id,
				variantId: variant.id,
				productName: product.name,
				productSlug: product.slug,
				sku: variant.sku,
				format: "BOTTLE" as const,
				volumeMl: 50,
				quantity: 1,
				unitPrice: "200.00",
				lineTotal: "200.00",
				imageUrl: `/test/${tag}/order.webp`,
			},
		},
	});

	const managedOrderNumber = `AVELIS-ADMIN-MANAGED-${tag}`;
	const cancellationOrderNumber = `AVELIS-ADMIN-CANCEL-${tag}`;

	try {
		await prisma.order.create({
			data: buildOrderData(managedOrderNumber),
		});
		await prisma.order.create({
			data: {
				...buildOrderData(cancellationOrderNumber),
				idempotencyKey: randomUUID(),
			},
		});

		await t.test(
			"lists real summaries with filtering, sorting, and pagination",
			async () => {
				const query = adminOrderListQuerySchema.parse({
					search: `Admin Customer ${tag}`,
					status: "PENDING_PAYMENT",
					paymentStatus: "PENDING",
					paymentMethod: "CARD",
					shippingMethod: "STANDARD",
					minTotal: 200,
					maxTotal: 250,
					sort: "total-desc",
					page: 1,
					limit: 1,
				});
				const result = await listAdminOrders(query);

				assert.equal(result.data.length, 1);
				assert.equal(result.total, 2);
				assert.equal(result.totalPages, 2);
				assert.equal(result.data[0]?.customerEmail, email);
				assert.equal(result.data[0]?.itemCount, 1);
				assert.equal(result.data[0]?.total, 219);
				assert.equal(
					result.data[0]?.firstItemImageUrl,
					`/test/${tag}/order.webp`,
				);
				assert.equal("shippingAddress" in (result.data[0] ?? {}), false);
				assert.equal(
					adminOrderListQuerySchema.safeParse({
						dateFrom: "2026-02-31",
					}).success,
					false,
				);
			},
		);

		await t.test("returns a safe complete order snapshot", async () => {
			const result = await getAdminOrder(managedOrderNumber);

			assert.equal(result.data.customer.email, email);
			assert.equal(result.data.linkedAccount?.email, email);
			assert.equal(result.data.shippingAddress.street, "Snapshot Street");
			assert.equal(result.data.deliveryNotes, "Leave with reception");
			assert.equal(result.data.items[0]?.productName, product.name);
			assert.deepEqual(result.data.allowedTransitions.orderStatus, [
				"CANCELLED",
			]);
			assert.deepEqual(result.data.allowedTransitions.paymentStatus, [
				"PAID",
				"FAILED",
				"CANCELLED",
			]);

			const serialized = JSON.stringify(result);
			for (const sensitiveField of [
				"passwordHash",
				"idempotencyKey",
				"idempotencyScope",
				"session",
				"tokenHash",
			]) {
				assert.equal(serialized.includes(sensitiveField), false);
			}
		});

		await t.test(
			"enforces forward-only compatible order and payment transitions",
			async () => {
				await expectHttpError(
					setAdminOrderStatus(managedOrderNumber, {
						status: "CONFIRMED",
					}),
					409,
					/payment/i,
				);

				await setAdminPaymentStatus(managedOrderNumber, {
					paymentStatus: "PAID",
				});
				await setAdminOrderStatus(managedOrderNumber, {
					status: "CONFIRMED",
				});
				await setAdminOrderStatus(managedOrderNumber, {
					status: "PROCESSING",
				});
				await setAdminOrderStatus(managedOrderNumber, {
					status: "SHIPPED",
				});
				await setAdminOrderStatus(managedOrderNumber, {
					status: "DELIVERED",
				});
				await expectHttpError(
					setAdminOrderStatus(managedOrderNumber, {
						status: "PROCESSING",
					}),
					409,
				);
				await setAdminPaymentStatus(managedOrderNumber, {
					paymentStatus: "REFUNDED",
				});
				const refunded = await setAdminOrderStatus(managedOrderNumber, {
					status: "REFUNDED",
				});

				assert.equal(refunded.data.status, "REFUNDED");
				assert.equal(refunded.data.paymentStatus, "REFUNDED");
				assert.ok(refunded.data.confirmedAt);
				assert.deepEqual(refunded.data.allowedTransitions.orderStatus, []);
				assert.deepEqual(refunded.data.allowedTransitions.paymentStatus, []);
			},
		);

		await t.test(
			"cancels without automatically restoring inventory",
			async () => {
				const stockBefore = await prisma.productVariant.findUniqueOrThrow({
					where: { id: variant.id },
					select: { stock: true },
				});
				const result = await setAdminOrderStatus(cancellationOrderNumber, {
					status: "CANCELLED",
				});
				const stockAfter = await prisma.productVariant.findUniqueOrThrow({
					where: { id: variant.id },
					select: { stock: true },
				});

				assert.equal(result.data.status, "CANCELLED");
				assert.match(result.message, /not automatically restored/i);
				assert.equal(stockAfter.stock, stockBefore.stock);
			},
		);

		await t.test("returns 404 for an unknown order number", async () => {
			await expectHttpError(
				getAdminOrder(`AVELIS-MISSING-${tag}`),
				404,
			);
			await expectHttpError(
				setAdminPaymentStatus(`AVELIS-MISSING-${tag}`, {
					paymentStatus: "PAID",
				}),
				404,
			);
		});
	} finally {
		await prisma.order.deleteMany({
			where: {
				orderNumber: {
					contains: tag,
				},
			},
		});
		await prisma.product.delete({ where: { id: product.id } });
		await prisma.user.delete({ where: { id: user.id } });
	}
});
