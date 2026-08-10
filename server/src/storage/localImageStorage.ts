import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
	ImageStorage,
	ImageStorageWrite,
	StoredImage,
} from "./imageStorage.js";
import {
	assertManagedProductKey,
	MANAGED_PRODUCT_KEY,
} from "./imageStorage.js";

export const UPLOAD_ROOT = fileURLToPath(
	new URL("../../uploads/", import.meta.url),
);

export class LocalImageStorage implements ImageStorage {
	constructor(
		private readonly rootDirectory = UPLOAD_ROOT,
		private readonly publicPrefix = "/uploads",
	) {}

	private resolveManagedPath(storageKey: string) {
		assertManagedProductKey(storageKey);

		const absolutePath = path.resolve(this.rootDirectory, storageKey);
		const relativePath = path.relative(this.rootDirectory, absolutePath);

		if (
			relativePath.startsWith("..") ||
			path.isAbsolute(relativePath)
		) {
			throw new Error("INVALID_PRODUCT_STORAGE_KEY");
		}

		return absolutePath;
	}

	getPublicUrl(storageKey: string) {
		assertManagedProductKey(storageKey);
		return `${this.publicPrefix}/${storageKey}`;
	}

	getStorageKeyFromUrl(url: string) {
		const prefix = `${this.publicPrefix}/`;
		if (!url.startsWith(prefix)) return null;

		const storageKey = url.slice(prefix.length);
		return MANAGED_PRODUCT_KEY.test(storageKey) ? storageKey : null;
	}

	async saveProductImage(input: ImageStorageWrite): Promise<StoredImage> {
		const storageKey = `products/${randomUUID()}.${input.extension}`;
		const absolutePath = this.resolveManagedPath(storageKey);

		await mkdir(path.dirname(absolutePath), { recursive: true });
		await writeFile(absolutePath, input.buffer, { flag: "wx" });

		return {
			url: this.getPublicUrl(storageKey),
			storageKey,
			mimeType: input.mimeType,
			sizeBytes: input.buffer.byteLength,
		};
	}

	async deleteProductImage(storageKey: string) {
		const absolutePath = this.resolveManagedPath(storageKey);

		try {
			await unlink(absolutePath);
			return true;
		} catch (error) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				error.code === "ENOENT"
			) {
				return false;
			}

			throw error;
		}
	}
}

// Kept as an explicit local adapter for integration tests and maintenance tools.
// Runtime application code imports the environment-selected adapter from index.ts.
export const imageStorage = new LocalImageStorage();
