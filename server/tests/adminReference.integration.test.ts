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
import { listCollections } from "../src/services/collectionService.js";
import {
	adminCollectionCreateSchema,
	adminCollectionListQuerySchema,
	adminCollectionUpdateSchema,
} from "../src/schemas/adminCollectionSchemas.js";
import {
	createAdminCollection,
	listAdminCollections,
	softDeleteAdminCollection,
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
	let productId: string | undefined;

	try {
		await t.test("creates, lists, and updates normalized collection data", async () => {
			const created = await createAdminCollection(
				adminCollectionCreateSchema.parse({
					name: "Evening Rituals",
					slug: ` Evening Rituals ${tag} `,
					description: "A temporary collection integration record.",
					imageUrl: `/images/collections/${tag}.webp`,
				}),
			);
			collectionId = created.data.id;
			assert.equal(created.data.slug, `evening-rituals-${tag}`);
			assert.equal(created.data.isActive, true);

			const listed = await listAdminCollections(
				adminCollectionListQuerySchema.parse({
					search: `evening-rituals-${tag}`,
					status: "active",
				}),
			);
			assert.equal(
				listed.data.some((collection) => collection.id === collectionId),
				true,
			);

			const updated = await updateAdminCollection(
				collectionId,
				adminCollectionUpdateSchema.parse({
					description: "Updated collection copy.",
				}),
			);
			assert.equal(updated.data.description, "Updated collection copy.");
		});

		await t.test("rejects duplicate normalized slugs", async () => {
			assert.ok(collectionId);
			await assert.rejects(
				createAdminCollection(
					adminCollectionCreateSchema.parse({
						name: "Duplicate Collection",
						slug: `evening rituals ${tag}`,
						description: "Duplicate slug test.",
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
			assert.ok(collectionId);
			const product = await prisma.product.create({
				data: {
					slug: `admin-collection-product-${tag}`,
					name: "Admin Collection Product",
					description: "Temporary collection relation test",
					fragranceFamily: "Test",
					concentration: "EDP",
					season: [],
					occasion: [],
					collections: {
						create: { collectionId },
					},
				},
				select: { id: true },
			});
			productId = product.id;

			const result = await softDeleteAdminCollection(collectionId);
			const relation = await prisma.productCollection.findUnique({
				where: {
					productId_collectionId: {
						productId,
						collectionId,
					},
				},
			});

			assert.equal(result.data.isActive, false);
			assert.ok(relation);
			assert.match(result.message, /relations are preserved/i);

			const preserved = await updateAdminProduct(
				productId,
				adminProductUpdateSchema.parse({
					collectionIds: [collectionId],
				}),
			);
			assert.equal(
				preserved.data.collections[0]?.id,
				collectionId,
			);

			const publicProduct = await getProductBySlug(
				`admin-collection-product-${tag}`,
			);
			assert.equal(
				publicProduct.data.collections.some(
					(collection) => collection.id === collectionId,
				),
				false,
			);
			const publicCollections = await listCollections();
			assert.equal(
				publicCollections.data.some(
					(collection) => collection.id === collectionId,
				),
				false,
			);

			await assert.rejects(
				createAdminProduct(
					adminProductCreateSchema.parse({
						name: "Inactive Collection Attachment",
						slug: `inactive-collection-attachment-${tag}`,
						description: "Must not be created",
						fragranceFamily: "Test",
						concentration: "EDP",
						variants: [
							{
								format: "BOTTLE",
								volumeMl: 50,
								price: 100,
								compareAtPrice: null,
								sku: `INACTIVE-COLLECTION-${tag}`,
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
		if (productId !== undefined) {
			await prisma.product.deleteMany({ where: { id: productId } });
		}
		if (collectionId !== undefined) {
			await prisma.collection.deleteMany({ where: { id: collectionId } });
		}
	}
});
