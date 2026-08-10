import type { ProductUploadMimeType } from "../config/uploads.js";

export interface ImageStorageWrite {
	buffer: Buffer;
	extension: "jpg" | "png" | "webp";
	mimeType: ProductUploadMimeType;
}

export interface StoredImage {
	url: string;
	storageKey: string;
	mimeType: ProductUploadMimeType;
	sizeBytes: number;
}

export interface ImageStorage {
	saveProductImage(input: ImageStorageWrite): Promise<StoredImage>;
	deleteProductImage(storageKey: string): Promise<boolean>;
	getPublicUrl(storageKey: string): string;
	getStorageKeyFromUrl(url: string): string | null;
}

export const MANAGED_PRODUCT_KEY =
	/^products\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(?:jpg|png|webp)$/i;

export function assertManagedProductKey(storageKey: string) {
	if (!MANAGED_PRODUCT_KEY.test(storageKey)) {
		throw new Error("INVALID_PRODUCT_STORAGE_KEY");
	}
}
