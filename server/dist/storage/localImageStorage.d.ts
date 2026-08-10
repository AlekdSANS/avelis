import type { ImageStorage, ImageStorageWrite, StoredImage } from "./imageStorage.js";
export declare const UPLOAD_ROOT: string;
export declare class LocalImageStorage implements ImageStorage {
    private readonly rootDirectory;
    private readonly publicPrefix;
    constructor(rootDirectory?: string, publicPrefix?: string);
    private resolveManagedPath;
    getPublicUrl(storageKey: string): string;
    getStorageKeyFromUrl(url: string): string | null;
    saveProductImage(input: ImageStorageWrite): Promise<StoredImage>;
    deleteProductImage(storageKey: string): Promise<boolean>;
}
export declare const imageStorage: LocalImageStorage;
//# sourceMappingURL=localImageStorage.d.ts.map