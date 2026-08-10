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
export declare const MANAGED_PRODUCT_KEY: RegExp;
export declare function assertManagedProductKey(storageKey: string): void;
//# sourceMappingURL=imageStorage.d.ts.map