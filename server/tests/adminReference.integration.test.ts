import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { prisma } from "../src/lib/prisma.js";
import {
	adminNoteCreateSchema,
	adminNoteListQuerySchema,
	adminNoteUpdateSchema,
} from "../src/schemas/adminNoteSchemas.js";
import {
	createAdminNote,
	listAdminNotes,
	softDeleteAdminNote,
	updateAdminNote,
} from "../src/services/adminNoteService.js";
import { HttpError } from "../src/utils/httpError.js";
import {
	createAdminProduct,
	updateAdminProduct,
} from "../src/services/adminProductService.js";
import {
	adminProductCreateSchema,
	adminProductUpdateSchema,
} from "../src/schemas/adminProductSchemas.js";
import { getProductBySlug } from "../src/services/productService.js";
import {
	getCollectionBySlug,
	listCollections,
} from "../src/services/collectionService.js";
import {
	adminCollectionCreateSchema,
	adminCollectionListQuerySchema,
	adminCollectionUpdateSchema,
} from "../src/schemas/adminCollectionSchemas.js";
import {
	archiveAdminCollection,
	createAdminCollection,
	getAdminCollection,
	listAdminCollections,
	updateAdminCollection,
} from "../src/services/adminCollectionService.js";

test("admin fragrance note management", async (t) => {
	const tag = randomUUID();
	let noteId: string | undefined;
	let productId: string | undefined;

	try {
		await t.test("creates, lists, and updates normalized note data", async () => {
			const created = await createAdminNote(
				adminNoteCreateSchema.parse({
					name: `  White   Tea ${tag}  `,
				}),
			);
			noteId = created.data.id;
			assert.equal(created.data.name, `White Tea ${tag}`);
			assert.equal(created.data.isActive, true);

			const listed = await listAdminNotes(
				adminNoteListQuerySchema.parse({
					search: `white tea ${tag}`,
					status: "active",
				}),
			);
			assert.equal(listed.data.some((note) => note.id === noteId), true);

			const updated = await updateAdminNote(
				noteId,
				adminNoteUpdateSchema.parse({
					name: `White Tea Blossom ${tag}`,
				}),
			);
			assert.equal(updated.data.name, `White Tea Blossom ${tag}`);
		});

		await t.test("rejects duplicate names case-insensitively", async () => {
			assert.ok(noteId);
			await assert.rejects(
				createAdminNote(
					adminNoteCreateSchema.parse({
						name: `white tea blossom ${tag}`,
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 409);
					return true;
				},
			);
		});

		await t.test("soft deactivation preserves existing product relations", async () => {
			assert.ok(noteId);
			const product = await prisma.product.create({
				data: {
					slug: `admin-note-product-${tag}`,
					name: "Admin Note Product",
					description: "Temporary note relation test",
					fragranceFamily: "Test",
					concentration: "EDP",
					season: [],
					occasion: [],
					notes: {
						create: {
							noteId,
							type: "TOP",
							position: 0,
						},
					},
				},
				select: { id: true },
			});
			productId = product.id;

			const result = await softDeleteAdminNote(noteId);
			const relation = await prisma.productNote.findUnique({
				where: {
					productId_noteId_type: {
						productId,
						noteId,
						type: "TOP",
					},
				},
			});

			assert.equal(result.data.isActive, false);
			assert.ok(relation);
			assert.match(result.message, /relations are preserved/i);

			const preserved = await updateAdminProduct(
				productId,
				adminProductUpdateSchema.parse({
					notes: [{ noteId, type: "TOP", position: 0 }],
				}),
			);
			assert.equal(preserved.data.notes[0]?.noteId, noteId);

			await assert.rejects(
				updateAdminProduct(
					productId,
					adminProductUpdateSchema.parse({
						notes: [
							{ noteId, type: "TOP", position: 0 },
							{ noteId, type: "HEART", position: 0 },
						],
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 409);
					return true;
				},
			);

			const publicProduct = await getProductBySlug(
				`admin-note-product-${tag}`,
			);
			assert.equal(
				publicProduct.data.notes.some(
					(note) => note.name === `White Tea Blossom ${tag}`,
				),
				false,
			);

			await assert.rejects(
				createAdminProduct(
					adminProductCreateSchema.parse({
						name: "Inactive Note Attachment",
						slug: `inactive-note-attachment-${tag}`,
						description: "Must not be created",
						fragranceFamily: "Test",
						concentration: "EDP",
						variants: [
							{
								format: "BOTTLE",
								volumeMl: 50,
								price: 100,
								compareAtPrice: null,
								sku: `INACTIVE-NOTE-${tag}`,
								stock: 1,
							},
						],
						notes: [{ noteId, type: "TOP", position: 0 }],
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 409);
					return true;
				},
			);
		});
	} finally {
		if (productId !== undefined) {
			await prisma.product.deleteMany({ where: { id: productId } });
		}
		if (noteId !== undefined) {
			await prisma.note.deleteMany({ where: { id: noteId } });
		}
	}
});

test("admin collection management", async (t) => {
	const tag = randomUUID();
	let collectionId: string | undefined;
	const productIds: string[] = [];

	try {
		await t.test("creates and lists a normalized draft", async () => {
			const created = await createAdminCollection(
				adminCollectionCreateSchema.parse({
					name: "Evening Rituals",
					slug: ` Evening Rituals ${tag} `,
					description: "A temporary collection integration record.",
					cardImageUrl: `/images/test/${tag}/collection-card.webp`,
					heroImageUrl: `/images/test/${tag}/collection-hero.webp`,
					accentColor: "#776655",
					status: "DRAFT",
				}),
			);
			collectionId = created.data.id;
			assert.equal(created.data.slug, `evening-rituals-${tag}`);
			assert.equal(created.data.status, "DRAFT");
			assert.equal(created.data.publishedAt, null);

			const listed = await listAdminCollections(
				adminCollectionListQuerySchema.parse({
					search: `evening-rituals-${tag}`,
					status: "DRAFT",
					sort: "sort-order",
				}),
			);
			assert.equal(
				listed.data.some((collection) => collection.id === collectionId),
				true,
			);

			const publicCollections = await listCollections();
			assert.equal(
				publicCollections.data.some(
					(collection) => collection.id === collectionId,
				),
				false,
			);
			await assert.rejects(
				getCollectionBySlug(`evening-rituals-${tag}`),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 404);
					return true;
				},
			);
		});

		await t.test("rejects duplicate normalized slugs", async () => {
			assert.ok(collectionId);
			await assert.rejects(
				createAdminCollection(
					adminCollectionCreateSchema.parse({
						name: "Duplicate Collection",
						slug: `evening rituals ${tag}`,
						description: "Duplicate slug test.",
						status: "DRAFT",
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 409);
					return true;
				},
			);
		});

		await t.test("rejects unknown product assignments", async () => {
			await assert.rejects(
				createAdminCollection(
					adminCollectionCreateSchema.parse({
						name: "Unknown product assignment",
						slug: `unknown-product-${tag}`,
						description: "Must not be created.",
						productIds: [`missing-${tag}`],
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 400);
					return true;
				},
			);
		});

		await t.test("publishes with ordered storefront products", async () => {
			assert.ok(collectionId);
			for (const index of [1, 2]) {
				const product = await prisma.product.create({
					data: {
						slug: `admin-collection-product-${index}-${tag}`,
						name: `Admin Collection Product ${index}`,
						description: "Temporary collection relation test",
						fragranceFamily: "Test",
						concentration: "EDP",
						season: [],
						occasion: [],
					},
					select: { id: true },
				});
				productIds.push(product.id);
			}

			const published = await updateAdminCollection(
				collectionId,
				adminCollectionUpdateSchema.parse({
					description: "Updated collection copy.",
					status: "PUBLISHED",
					productIds: [productIds[1], productIds[0]],
				}),
			);
			assert.equal(published.data.status, "PUBLISHED");
			assert.ok(published.data.publishedAt);
			assert.deepEqual(
				published.data.products.map((product) => product.id),
				[productIds[1], productIds[0]],
			);

			const detail = await getAdminCollection(collectionId);
			assert.deepEqual(detail.data.productIds, [productIds[1], productIds[0]]);

			const publicDetail = await getCollectionBySlug(
				`evening-rituals-${tag}`,
			);
			assert.deepEqual(
				publicDetail.data.products.map((product) => product.id),
				[productIds[1], productIds[0]],
			);
		});

		await t.test("archive preserves assignments and product records", async () => {
			assert.ok(collectionId);
			const result = await archiveAdminCollection(collectionId);
			const relations = await prisma.productCollection.findMany({
				where: { collectionId },
				orderBy: { sortOrder: "asc" },
			});
			const products = await prisma.product.count({
				where: { id: { in: productIds } },
			});

			assert.equal(result.data.status, "ARCHIVED");
			assert.deepEqual(
				relations.map((relation) => relation.productId),
				[productIds[1], productIds[0]],
			);
			assert.equal(products, 2);
			assert.match(result.message, /assignments were preserved/i);

			const preserved = await updateAdminProduct(
				productIds[0]!,
				adminProductUpdateSchema.parse({
					collectionIds: [collectionId],
				}),
			);
			assert.equal(preserved.data.collections[0]?.id, collectionId);

			const publicCollections = await listCollections();
			assert.equal(
				publicCollections.data.some(
					(collection) => collection.id === collectionId,
				),
				false,
			);
			await assert.rejects(
				getCollectionBySlug(`evening-rituals-${tag}`),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 404);
					return true;
				},
			);

			await assert.rejects(
				createAdminProduct(
					adminProductCreateSchema.parse({
						name: "Archived Collection Attachment",
						slug: `archived-collection-attachment-${tag}`,
						description: "Must not be created",
						fragranceFamily: "Test",
						concentration: "EDP",
						variants: [
							{
								format: "BOTTLE",
								volumeMl: 50,
								price: 100,
								compareAtPrice: null,
								sku: `ARCHIVED-COLLECTION-${tag}`,
								stock: 1,
							},
						],
						collectionIds: [collectionId],
					}),
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 409);
					return true;
				},
			);
		});
	} finally {
		if (productIds.length > 0) {
			await prisma.product.deleteMany({ where: { id: { in: productIds } } });
		}
		if (collectionId !== undefined) {
			await prisma.collection.deleteMany({ where: { id: collectionId } });
		}
	}
});
