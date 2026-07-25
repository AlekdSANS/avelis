import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type {
	ImageStorage,
	ImageStorageWrite,
	StoredImage,
} from "./imageStorage.js";

export const UPLOAD_ROOT = fileURLToPath(
	new URL("../../uploads/", import.meta.url),
);

const MANAGED_PRODUCT_KEY =
	/^products\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp)$/i;

export class LocalImageStorage implements ImageStorage {
	constructor(
		private readonly rootDirectory = UPLOAD_ROOT,
		private readonly publicPrefix = "/uploads",
	) {}

	private resolveManagedPath(storageKey: string) {
		if (!MANAGED_PRODUCT_KEY.test(storageKey)) {
			throw new Error("INVALID_PRODUCT_STORAGE_KEY");
		}

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

	async saveProductImage(input: ImageStorageWrite): Promise<StoredImage> {
		const storageKey = `products/${randomUUID()}.${input.extension}`;
		const absolutePath = this.resolveManagedPath(storageKey);

		await mkdir(path.dirname(absolutePath), { recursive: true });
		await writeFile(absolutePath, input.buffer, { flag: "wx" });

		return {
			url: `${this.publicPrefix}/${storageKey}`,
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

export const imageStorage = new LocalImageStorage();
