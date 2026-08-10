import type { ImageStorage, ImageStorageWrite, StoredImage } from "./imageStorage.js";
export type S3ImageStorageOptions = {
    accessKeyId: string;
    bucket: string;
    endpoint?: string;
    forcePathStyle?: boolean;
    publicBaseUrl: string;
    region: string;
    secretAccessKey: string;
};
export declare class S3ImageStorage implements ImageStorage {
    private readonly options;
    private readonly client;
    private readonly publicBaseUrl;
    constructor(options: S3ImageStorageOptions);
    getPublicUrl(storageKey: string): string;
    getStorageKeyFromUrl(url: string): string | null;
    saveProductImage(input: ImageStorageWrite): Promise<StoredImage>;
    deleteProductImage(storageKey: string): Promise<boolean>;
}
//# sourceMappingURL=s3ImageStorage.d.ts.map