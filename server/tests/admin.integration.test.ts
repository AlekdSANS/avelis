import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import type { NextFunction, Request, Response } from "express";
import { requireAdmin, requireAuth } from "../src/middleware/authMiddleware.js";
import type { SafeUser } from "../src/repositories/authRepository.js";
import { getAdminDashboard } from "../src/services/adminService.js";
import { prisma } from "../src/lib/prisma.js";
import { HttpError } from "../src/utils/httpError.js";

function buildAuthUser(role: SafeUser["role"]): SafeUser {
	const now = new Date();

	return {
		id: `test-${role.toLowerCase()}`,
		firstName: "Admin",
		lastName: "Tester",
		email: `${role.toLowerCase()}@example.com`,
		role,
		createdAt: now,
		updatedAt: now,
	};
}

function runMiddleware(
	middleware: (
		req: Request,
		res: Response,
		next: NextFunction,
	) => void,
	authUser?: SafeUser,
) {
	let nextError: unknown;
	let didContinue = false;
	const request = { authUser } as Request;

	middleware(request, {} as Response, (error?: unknown) => {
		nextError = error;
		didContinue = error === undefined;
	});

	return { didContinue, nextError };
}

test("admin authorization middleware", async (t) => {
	await t.test("rejects anonymous requests with 401", () => {
		const authResult = runMiddleware(requireAuth);
		const adminResult = runMiddleware(requireAdmin);

		assert.ok(authResult.nextError instanceof HttpError);
		assert.equal(authResult.nextError.statusCode, 401);
		assert.ok(adminResult.nextError instanceof HttpError);
		assert.equal(adminResult.nextError.statusCode, 401);
	});

	await t.test("rejects authenticated USER requests with 403", () => {
		const result = runMiddleware(requireAdmin, buildAuthUser("USER"));

		assert.ok(result.nextError instanceof HttpError);
		assert.equal(result.nextError.statusCode, 403);
	});

	await t.test("allows authenticated ADMIN requests", () => {
		const authResult = runMiddleware(requireAuth, buildAuthUser("ADMIN"));
		const adminResult = runMiddleware(requireAdmin, buildAuthUser("ADMIN"));

		assert.equal(authResult.didContinue, true);
		assert.equal(adminResult.didContinue, true);
	});
});

test("admin dashboard uses real aggregates and a safe projection", async () => {
	const tag = randomUUID();
	const before = await getAdminDashboard();
	const customer = await prisma.user.create({
		data: {
			firstName: "Dashboard",
			lastName: "Customer",
			email: `dashboard-${tag}@example.com`,
			passwordHash: "integration-test-password-hash",
		},
		select: { id: true },
	});
	const activeProduct = await prisma.product.create({
		data: {
			slug: `dashboard-active-${tag}`,
			name: "Dashboard Active Product",
			description: "Temporary dashboard integration product",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			variants: {
				create: [
					{
						volumeMl: 50,
						price: "100.00",
						sku: `DASHBOARD-LOW-${tag}`,
						stock: 5,
					},
					{
						volumeMl: 100,
						price: "150.00",
						sku: `DASHBOARD-ZERO-${tag}`,
						stock: 0,
					},
				],
			},
		},
		select: { id: true },
	});
	const inactiveProduct = await prisma.product.create({
		data: {
			slug: `dashboard-inactive-${tag}`,
			name: "Dashboard Inactive Product",
			description: "Temporary inactive dashboard integration product",
			fragranceFamily: "Test",
			concentration: "EDP",
			season: [],
			occasion: [],
			isActive: false,
			variants: {
				create: {
					volumeMl: 50,
					price: "80.00",
					sku: `DASHBOARD-INACTIVE-LOW-${tag}`,
					stock: 1,
				},
			},
		},
		select: { id: true },
	});

	const baseOrder = {
		userId: customer.id,
		customerEmail: `dashboard-${tag}@example.com`,
		customerFirstName: "Dashboard",
		customerLastName: "Customer",
		customerPhone: "+48123456789",
		shippingCountry: "PL",
		shippingCity: "Warsaw",
		shippingPostalCode: "00-001",
		shippingStreet: "Test Street",
		shippingBuilding: "1",
		shippingMethod: "STANDARD" as const,
		paymentMethod: "CARD" as const,
		paymentStatus: "PAID" as const,
		subtotal: "100.00",
		shippingTotal: "0.00",
		discountTotal: "0.00",
		total: "100.00",
		currency: "EUR",
	};

	try {
		await prisma.order.createMany({
			data: [
				{
					...baseOrder,
					orderNumber: `AVELIS-DASHBOARD-DELIVERED-${tag}`,
					status: "DELIVERED",
				},
				{
					...baseOrder,
					orderNumber: `AVELIS-DASHBOARD-CANCELLED-${tag}`,
					status: "CANCELLED",
					total: "50.00",
				},
				{
					...baseOrder,
					orderNumber: `AVELIS-DASHBOARD-REFUNDED-${tag}`,
					status: "REFUNDED",
					paymentStatus: "REFUNDED",
					total: "30.00",
				},
			],
		});

		const after = await getAdminDashboard();

		assert.equal(
			after.data.products.total,
			before.data.products.total + 2,
		);
		assert.equal(
			after.data.products.active,
			before.data.products.active + 1,
		);
		assert.equal(
			after.data.products.inactive,
			before.data.products.inactive + 1,
		);
		assert.equal(
			after.data.products.lowStockVariants,
			before.data.products.lowStockVariants + 2,
		);
		assert.equal(after.data.orders.total, before.data.orders.total + 3);
		assert.equal(
			after.data.orders.delivered,
			before.data.orders.delivered + 1,
		);
		assert.equal(
			after.data.customers.total,
			before.data.customers.total + 1,
		);
		assert.equal(after.data.revenue.total, before.data.revenue.total + 100);
		assert.ok(
			after.data.recentOrders.some(
				(order) =>
					order.orderNumber === `AVELIS-DASHBOARD-DELIVERED-${tag}`,
			),
		);

		const serialized = JSON.stringify(after);

		for (const sensitiveField of [
			"passwordHash",
			"tokenHash",
			"session",
			"shippingStreet",
			"idempotencyKey",
		]) {
			assert.equal(serialized.includes(sensitiveField), false);
		}
	} finally {
		await prisma.order.deleteMany({
			where: {
				orderNumber: {
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
		await prisma.user.delete({
			where: {
				id: customer.id,
			},
		});
	}
});
