import type { DeleteProductUploadInput } from "../schemas/adminUploadSchemas.js";
import type { ImageStorage, StoredImage } from "../storage/imageStorage.js";
export declare function storeAdminProductImages(files: Express.Multer.File[], storage?: ImageStorage): Promise<{
    data: StoredImage[];
}>;
export declare function deleteAdminProductUpload(input: DeleteProductUploadInput, storage?: ImageStorage): Promise<{
    data: {
        storageKey: string;
        deleted: boolean;
    };
    message: string;
}>;
//# sourceMappingURL=adminUploadService.d.ts.map