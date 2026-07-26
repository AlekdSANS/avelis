import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { access } from "node:fs/promises";
import test from "node:test";
import { prisma } from "../src/lib/prisma.js";
import {
	adminProductCreateSchema,
	adminProductListQuerySchema,
	adminProductUpdateSchema,
} from "../src/schemas/adminProductSchemas.js";
import {
	createAdminProduct,
	getAdminProduct,
	listAdminProductReferenceNotes,
	listAdminProducts,
	softDeleteAdminProduct,
	updateAdminProduct,
} from "../src/services/adminProductService.js";
import { HttpError } from "../src/utils/httpError.js";
import { imageStorage, UPLOAD_ROOT } from "../src/storage/localImageStorage.js";
import path from "node:path";

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

test("admin product CRUD foundation", async (t) => {
	const tag = randomUUID();
	const note = await prisma.note.create({
		data: {
			name: `Admin product note ${tag}`,
		},
		select: { id: true },
	});
	const collection = await prisma.collection.create({
		data: {
			slug: `admin-product-collection-${tag}`,
			name: `Admin Product Collection ${tag}`,
			description: "Temporary admin product integration collection",
			status: "PUBLISHED",
			publishedAt: new Date(),
		},
		select: { id: true },
	});
	let productId: string | undefined;
	let orderId: string | undefined;
	let managedStorageKey: string | undefined;

	const buildCreateInput = (overrides?: {
		slug?: string;
		firstSku?: string;
		secondSku?: string;
	}) =>
		adminProductCreateSchema.parse({
			name: "Admin Product Test",
			slug: overrides?.slug ?? `Admin Product ${tag}`,
			subtitle: "A transactional test fragrance",
			description: "Temporary product used by the admin integration suite.",
			fragranceFamily: "Woody",
			concentration: "Eau de Parfum",
			gender: "Unisex",
			longevity: "8 hours",
			season: ["autumn", "autumn", "winter"],
			occasion: ["evening"],
			isActive: true,
			isFeatured: false,
			isNew: true,
			isLimited: false,
			variants: [
				{
					format: "BOTTLE",
					volumeMl: 50,
					price: 329,
					compareAtPrice: 359,
					sku: overrides?.firstSku ?? `ADMIN-B50-${tag}`,
					stock: 5,
				},
				{
					format: "REFILL",
					volumeMl: 100,
					price: 249,
					compareAtPrice: null,
					sku: overrides?.secondSku ?? `ADMIN-R100-${tag}`,
					stock: 0,
				},
			],
			images: [
				{
					url: `/images/test/${tag}/main.webp`,
					alt: "Admin Product Test bottle",
					position: 7,
					isPrimary: true,
					imageType: "MAIN",
				},
			],
			notes: [
				{
					noteId: note.id,
					type: "TOP",
					position: 4,
				},
			],
			collectionIds: [collection.id],
		});

	try {
		await t.test("validates variant and image business rules", () => {
			const invalidBottle = adminProductCreateSchema.safeParse({
				...buildCreateInput(),
				slug: `invalid-bottle-${tag}`,
				variants: [
					{
						format: "BOTTLE",
						volumeMl: 150,
						price: 100,
						compareAtPrice: null,
						sku: `INVALID-B150-${tag}`,
						stock: 0,
					},
				],
			});
			const invalidImages = adminProductCreateSchema.safeParse({
				...buildCreateInput(),
				slug: `invalid-images-${tag}`,
				variants: [
					{
						format: "BOTTLE",
						volumeMl: 50,
						price: 100,
						compareAtPrice: null,
						sku: `INVALID-IMAGE-${tag}`,
						stock: 0,
					},
				],
				images: [
					{
						url: "/images/test/one.webp",
						alt: "First",
						position: 0,
						isPrimary: true,
						imageType: "MAIN",
					},
					{
						url: "/images/test/two.webp",
						alt: "Second",
						position: 1,
						isPrimary: true,
						imageType: "GALLERY",
					},
				],
			});

			assert.equal(invalidBottle.success, false);
			assert.equal(invalidImages.success, false);
		});

		await t.test("creates a complete product transactionally", async () => {
			const created = await createAdminProduct(buildCreateInput());
			productId = created.data.id;

			assert.equal(created.data.slug, `admin-product-${tag}`);
			assert.equal(created.data.variants.length, 2);
			assert.equal(created.data.images.length, 1);
			assert.equal(created.data.images[0]?.position, 0);
			assert.equal(created.data.notes[0]?.noteId, note.id);
			assert.equal(created.data.notes[0]?.position, 0);
			assert.equal(created.data.collections[0]?.id, collection.id);
			assert.deepEqual(created.data.season, ["autumn", "winter"]);
		});

		await t.test("rejects duplicate slug and globally duplicate SKU", async () => {
			assert.ok(productId);

			await expectHttpError(
				createAdminProduct(
					buildCreateInput({
						slug: `admin-product-${tag}`,
						firstSku: `DUP-SLUG-B50-${tag}`,
						secondSku: `DUP-SLUG-R100-${tag}`,
					}),
				),
				409,
				/slug/i,
			);
			await expectHttpError(
				createAdminProduct(
					buildCreateInput({
						slug: `duplicate-sku-${tag}`,
						firstSku: `ADMIN-B50-${tag}`,
						secondSku: `DUP-SKU-R100-${tag}`,
					}),
				),
				409,
				/SKU/,
			);
			assert.equal(
				await prisma.product.count({
					where: {
						slug: {
							in: [`duplicate-sku-${tag}`, `admin-product-${tag}`],
						},
					},
				}),
				1,
			);
		});

		await t.test("lists and searches concise real product summaries", async () => {
			assert.ok(productId);
			const query = adminProductListQuerySchema.parse({
				search: `ADMIN-B50-${tag}`,
				status: "active",
				format: "BOTTLE",
				stock: "low-stock",
				sort: "stock-desc",
				page: 1,
				limit: 20,
			});
			const result = await listAdminProducts(query);
			const product = result.data.find((item) => item.id === productId);

			assert.ok(product);
			assert.equal(product.variantCount, 2);
			assert.equal(product.totalStock, 5);
			assert.equal(product.lowStockVariantCount, 1);
			assert.equal(product.outOfStockVariantCount, 1);
			assert.equal(product.collectionCount, 1);
			assert.equal("description" in product, false);
			assert.equal("variants" in product, false);
			assert.ok(result.total >= 1);
		});

		await t.test("lists safe note reference data for the editor", async () => {
			const result = await listAdminProductReferenceNotes();
			const referenceNote = result.data.find(
				(candidate) => candidate.id === note.id,
			);

			assert.deepEqual(referenceNote, {
				id: note.id,
				name: `Admin product note ${tag}`,
				isActive: true,
			});
			assert.equal(JSON.stringify(result).includes("productId"), false);
		});

		await t.test(
			"reconciles nested variants and preserves provided IDs",
			async () => {
				assert.ok(productId);
				const before = await getAdminProduct(productId);
				const bottle = before.data.variants.find(
					(variant) =>
						variant.format === "BOTTLE" && variant.volumeMl === 50,
				);
				const removedRefill = before.data.variants.find(
					(variant) =>
						variant.format === "REFILL" && variant.volumeMl === 100,
				);
				const image = before.data.images[0];

				assert.ok(bottle);
				assert.ok(removedRefill);
				assert.ok(image);

				const input = adminProductUpdateSchema.parse({
					name: "Updated Admin Product Test",
					variants: [
						{
							id: bottle.id,
							format: "BOTTLE",
							volumeMl: 50,
							price: 339,
							compareAtPrice: 369,
							sku: `ADMIN-B50-${tag}`,
							stock: 8,
						},
						{
							format: "REFILL",
							volumeMl: 150,
							price: 279,
							compareAtPrice: null,
							sku: `ADMIN-R150-${tag}`,
							stock: 12,
						},
					],
					images: [
						{
							id: image.id,
							url: image.url,
							alt: "Updated Admin Product Test bottle",
							position: 12,
							isPrimary: true,
							imageType: "MAIN",
						},
					],
				});
				const updated = await updateAdminProduct(productId, input);

				assert.equal(updated.data.name, "Updated Admin Product Test");
				assert.equal(updated.data.variants.length, 2);
				assert.equal(
					updated.data.variants.find((variant) => variant.id === bottle.id)
						?.stock,
					8,
				);
				assert.equal(
					updated.data.variants.some(
						(variant) =>
							variant.format === "REFILL" && variant.volumeMl === 150,
					),
					true,
				);
				assert.equal(
					await prisma.productVariant.findUnique({
						where: { id: removedRefill.id },
					}),
					null,
				);
				assert.equal(updated.data.images[0]?.id, image.id);
				assert.equal(updated.data.images[0]?.position, 0);
			},
		);

		await t.test("rejects nested IDs from outside the product", async () => {
			assert.ok(productId);
			const current = await getAdminProduct(productId);
			const currentBottle = current.data.variants[0];
			assert.ok(currentBottle);

			await expectHttpError(
				updateAdminProduct(
					productId,
					adminProductUpdateSchema.parse({
						variants: [
							{
								id: `other-product-variant-${tag}`,
								format: currentBottle.format,
								volumeMl: currentBottle.volumeMl,
								price: currentBottle.price,
								compareAtPrice: currentBottle.compareAtPrice,
								sku: currentBottle.sku,
								stock: currentBottle.stock,
							},
						],
					}),
				),
				409,
				/do not belong/i,
			);
		});

		await t.test(
			"persists managed upload metadata and deletes detached files after commit",
			async () => {
				assert.ok(productId);
				const current = await getAdminProduct(productId);
				const existingImage = current.data.images[0];
				assert.ok(existingImage);
				const png = Buffer.from(
					"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
					"base64",
				);
				const managed = await imageStorage.saveProductImage({
					buffer: png,
					extension: "png",
					mimeType: "image/png",
				});
				managedStorageKey = managed.storageKey;

				const withManagedImage = await updateAdminProduct(
					productId,
					adminProductUpdateSchema.parse({
						images: [
							{
								id: existingImage.id,
								url: existingImage.url,
								alt: existingImage.alt,
								position: 0,
								isPrimary: true,
								imageType: existingImage.imageType,
							},
							{
								url: managed.url,
								storageKey: managed.storageKey,
								mimeType: managed.mimeType,
								sizeBytes: managed.sizeBytes,
								alt: "Managed integration image",
								position: 1,
								isPrimary: false,
								imageType: "GALLERY",
							},
						],
					}),
				);
				const managedImage = withManagedImage.data.images.find(
					(image) => image.storageKey === managed.storageKey,
				);
				assert.ok(managedImage);
				assert.equal(managedImage.mimeType, "image/png");
				assert.equal(managedImage.sizeBytes, png.byteLength);

				await updateAdminProduct(
					productId,
					adminProductUpdateSchema.parse({
						images: [
							{
								id: existingImage.id,
								url: existingImage.url,
								alt: existingImage.alt,
								position: 0,
								isPrimary: true,
								imageType: existingImage.imageType,
							},
						],
					}),
				);

				await assert.rejects(
					access(path.join(UPLOAD_ROOT, managed.storageKey)),
				);
				managedStorageKey = undefined;
			},
		);

		await t.test(
			"soft deactivation preserves product and order history",
			async () => {
				assert.ok(productId);
				const product = await getAdminProduct(productId);
				const variant = product.data.variants[0];
				assert.ok(variant);

				const order = await prisma.order.create({
					data: {
						orderNumber: `AVELIS-ADMIN-PRODUCT-${tag}`,
						customerEmail: `admin-product-${tag}@example.com`,
						customerFirstName: "Admin",
						customerLastName: "Product",
						customerPhone: "+48123456789",
						shippingCountry: "PL",
						shippingCity: "Warsaw",
						shippingPostalCode: "00-001",
						shippingStreet: "Test Street",
						shippingBuilding: "1",
						shippingMethod: "STANDARD",
						paymentMethod: "CARD",
						subtotal: "339.00",
						shippingTotal: "0.00",
						discountTotal: "0.00",
						total: "339.00",
						items: {
							create: {
								productId,
								variantId: variant.id,
								productName: product.data.name,
								productSlug: product.data.slug,
								sku: variant.sku,
								format: variant.format,
								volumeMl: variant.volumeMl,
								quantity: 1,
								unitPrice: "339.00",
								lineTotal: "339.00",
							},
						},
					},
					select: { id: true },
				});
				orderId = order.id;

				const result = await softDeleteAdminProduct(productId);
				const persistedProduct = await prisma.product.findUniqueOrThrow({
					where: { id: productId },
					select: { isActive: true },
				});
				const persistedItem = await prisma.orderItem.findFirstOrThrow({
					where: { orderId: order.id },
					select: {
						productId: true,
						productName: true,
						productSlug: true,
					},
				});

				assert.equal(result.data.isActive, false);
				assert.match(result.message, /historical order data is preserved/i);
				assert.equal(persistedProduct.isActive, false);
				assert.equal(persistedItem.productId, productId);
				assert.equal(persistedItem.productName, product.data.name);
				assert.equal(persistedItem.productSlug, product.data.slug);
			},
		);

		const safeDetail = await getAdminProduct(productId);
		const serialized = JSON.stringify(safeDetail);
		for (const sensitiveField of [
			"passwordHash",
			"tokenHash",
			"session",
			"customerEmail",
		]) {
			assert.equal(serialized.includes(sensitiveField), false);
		}
	} finally {
		if (managedStorageKey !== undefined) {
			await imageStorage.deleteProductImage(managedStorageKey);
		}
		if (orderId !== undefined) {
			await prisma.order.deleteMany({ where: { id: orderId } });
		}
		if (productId !== undefined) {
			await prisma.product.deleteMany({ where: { id: productId } });
		}
		await prisma.collection.deleteMany({ where: { id: collection.id } });
		await prisma.note.deleteMany({ where: { id: note.id } });
	}
});
