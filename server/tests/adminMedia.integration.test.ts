import assert from "node:assert/strict";
import { access, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import {
	deleteAdminProductUpload,
	storeAdminProductImages,
} from "../src/services/adminUploadService.js";
import { LocalImageStorage } from "../src/storage/localImageStorage.js";
import { HttpError } from "../src/utils/httpError.js";
import { prisma } from "../src/lib/prisma.js";
import { randomUUID } from "node:crypto";

const onePixelPng = Buffer.from(
	"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
	"base64",
);

function buildUpload(
	buffer: Buffer,
	mimetype: string,
): Express.Multer.File {
	return {
		fieldname: "images",
		originalname: "client-controlled-name.png",
		encoding: "7bit",
		mimetype,
		size: buffer.byteLength,
		buffer,
		stream: undefined as never,
		destination: "",
		filename: "",
		path: "",
	};
}

test("managed product image storage", async (t) => {
	const rootDirectory = await mkdtemp(
		path.join(tmpdir(), "avelis-product-upload-"),
	);
	const storage = new LocalImageStorage(rootDirectory, "/uploads");

	try {
		await t.test("validates image signatures and generates opaque keys", async () => {
			const response = await storeAdminProductImages(
				[buildUpload(onePixelPng, "image/png")],
				storage,
			);
			const image = response.data[0];

			assert.ok(image);
			assert.match(
				image.storageKey,
				/^products\/[0-9a-f-]+\.png$/i,
			);
			assert.equal(image.url, `/uploads/${image.storageKey}`);
			assert.equal(image.mimeType, "image/png");
			assert.equal(image.sizeBytes, onePixelPng.byteLength);
			assert.equal(
				image.storageKey.includes("client-controlled-name"),
				false,
			);
			await access(path.join(rootDirectory, image.storageKey));

			assert.equal(
				await storage.deleteProductImage(image.storageKey),
				true,
			);
			assert.equal(
				await storage.deleteProductImage(image.storageKey),
				false,
			);
		});

		await t.test("rejects declared MIME mismatches", async () => {
			await assert.rejects(
				storeAdminProductImages(
					[buildUpload(onePixelPng, "image/jpeg")],
					storage,
				),
				(error: unknown) => {
					assert.ok(error instanceof HttpError);
					assert.equal(error.statusCode, 400);
					assert.match(error.message, /JPEG, PNG, or WebP/);
					return true;
				},
			);
		});

		await t.test("rejects traversal and unmanaged filenames", async () => {
			await assert.rejects(
				storage.deleteProductImage("../outside.png"),
				/INVALID_PRODUCT_STORAGE_KEY/,
			);
			await assert.rejects(
				storage.deleteProductImage("products/customer-name.png"),
				/INVALID_PRODUCT_STORAGE_KEY/,
			);
		});

		await t.test(
			"refuses referenced files and deletes unreferenced files idempotently",
			async () => {
				const uploaded = (
					await storeAdminProductImages(
						[buildUpload(onePixelPng, "image/png")],
						storage,
					)
				).data[0];
				assert.ok(uploaded);
				const tag = randomUUID();
				const product = await prisma.product.create({
					data: {
						slug: `admin-media-${tag}`,
						name: "Admin Media Product",
						description: "Temporary managed media test",
						fragranceFamily: "Test",
						concentration: "EDP",
						season: [],
						occasion: [],
						images: {
							create: {
								url: uploaded.url,
								storageKey: uploaded.storageKey,
								mimeType: uploaded.mimeType,
								sizeBytes: uploaded.sizeBytes,
								alt: "Managed media test",
								isPrimary: true,
								imageType: "MAIN",
							},
						},
					},
					select: { id: true },
				});

				try {
					await assert.rejects(
						deleteAdminProductUpload(
							{ storageKey: uploaded.storageKey },
							storage,
						),
						(error: unknown) => {
							assert.ok(error instanceof HttpError);
							assert.equal(error.statusCode, 409);
							return true;
						},
					);
				} finally {
					await prisma.product.delete({ where: { id: product.id } });
				}

				const collection = await prisma.collection.create({
					data: {
						slug: `admin-media-collection-${tag}`,
						name: "Admin Media Collection",
						description: "Temporary collection media reference",
						heroImageUrl: uploaded.url,
					},
					select: { id: true },
				});

				try {
					await assert.rejects(
						deleteAdminProductUpload(
							{ storageKey: uploaded.storageKey },
							storage,
						),
						(error: unknown) => {
							assert.ok(error instanceof HttpError);
							assert.equal(error.statusCode, 409);
							return true;
						},
					);
				} finally {
					await prisma.collection.delete({ where: { id: collection.id } });
				}

				const deleted = await deleteAdminProductUpload(
					{ storageKey: uploaded.storageKey },
					storage,
				);
				const repeated = await deleteAdminProductUpload(
					{ storageKey: uploaded.storageKey },
					storage,
				);
				assert.equal(deleted.data.deleted, true);
				assert.equal(repeated.data.deleted, false);
			},
		);
	} finally {
		await rm(rootDirectory, { recursive: true, force: true });
	}
});
