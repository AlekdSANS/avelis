import { randomUUID } from "node:crypto";
import { DeleteObjectCommand, PutObjectCommand, S3Client, } from "@aws-sdk/client-s3";
import { assertManagedProductKey, MANAGED_PRODUCT_KEY, } from "./imageStorage.js";
export class S3ImageStorage {
    options;
    client;
    publicBaseUrl;
    constructor(options) {
        this.options = options;
        this.publicBaseUrl = options.publicBaseUrl.replace(/\/+$/, "");
        this.client = new S3Client({
            credentials: {
                accessKeyId: options.accessKeyId,
                secretAccessKey: options.secretAccessKey,
            },
            ...(options.endpoint === undefined
                ? {}
                : { endpoint: options.endpoint }),
            forcePathStyle: options.forcePathStyle ?? false,
            region: options.region,
        });
    }
    getPublicUrl(storageKey) {
        assertManagedProductKey(storageKey);
        return `${this.publicBaseUrl}/${storageKey}`;
    }
    getStorageKeyFromUrl(url) {
        const prefix = `${this.publicBaseUrl}/`;
        if (!url.startsWith(prefix))
            return null;
        const storageKey = url.slice(prefix.length);
        return MANAGED_PRODUCT_KEY.test(storageKey) ? storageKey : null;
    }
    async saveProductImage(input) {
        const storageKey = `products/${randomUUID()}.${input.extension}`;
        await this.client.send(new PutObjectCommand({
            Bucket: this.options.bucket,
            Key: storageKey,
            Body: input.buffer,
            CacheControl: "public, max-age=31536000, immutable",
            ContentLength: input.buffer.byteLength,
            ContentType: input.mimeType,
        }));
        return {
            url: this.getPublicUrl(storageKey),
            storageKey,
            mimeType: input.mimeType,
            sizeBytes: input.buffer.byteLength,
        };
    }
    async deleteProductImage(storageKey) {
        assertManagedProductKey(storageKey);
        await this.client.send(new DeleteObjectCommand({
            Bucket: this.options.bucket,
            Key: storageKey,
        }));
        return true;
    }
}
//# sourceMappingURL=s3ImageStorage.js.map