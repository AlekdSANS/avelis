import assert from "node:assert/strict";
import test from "node:test";
import { LocalImageStorage } from "../src/storage/localImageStorage.js";
import { S3ImageStorage } from "../src/storage/s3ImageStorage.js";

const managedKey = "products/123e4567-e89b-42d3-a456-426614174000.webp";

test("storage adapters produce and recognize managed public URLs", () => {
	const local = new LocalImageStorage("C:/temporary-avelis-test", "/uploads");
	assert.equal(local.getPublicUrl(managedKey), `/uploads/${managedKey}`);
	assert.equal(local.getStorageKeyFromUrl(`/uploads/${managedKey}`), managedKey);
	assert.equal(local.getStorageKeyFromUrl("/images/unmanaged.webp"), null);

	const objectStorage = new S3ImageStorage({
		accessKeyId: "test-access-key",
		bucket: "avelis-test",
		endpoint: "https://example.r2.cloudflarestorage.com",
		publicBaseUrl: "https://assets.example.com/",
		region: "auto",
		secretAccessKey: "test-secret-key",
	});

	assert.equal(
		objectStorage.getPublicUrl(managedKey),
		`https://assets.example.com/${managedKey}`,
	);
	assert.equal(
		objectStorage.getStorageKeyFromUrl(
			`https://assets.example.com/${managedKey}`,
		),
		managedKey,
	);
	assert.equal(
		objectStorage.getStorageKeyFromUrl(
			`https://another.example.com/${managedKey}`,
		),
		null,
	);
});

test("storage adapters reject keys outside the managed product namespace", () => {
	const local = new LocalImageStorage();
	assert.throws(
		() => local.getPublicUrl("../private.txt"),
		/INVALID_PRODUCT_STORAGE_KEY/,
	);
});
