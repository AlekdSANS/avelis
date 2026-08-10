import { env } from "../config/env.js";
import type { ImageStorage } from "./imageStorage.js";
import { LocalImageStorage } from "./localImageStorage.js";
import { S3ImageStorage } from "./s3ImageStorage.js";

function createImageStorage(): ImageStorage {
	if (env.IMAGE_STORAGE_PROVIDER === "local") {
		return new LocalImageStorage();
	}

	return new S3ImageStorage({
		accessKeyId: env.S3_ACCESS_KEY_ID!,
		bucket: env.S3_BUCKET!,
		...(env.S3_ENDPOINT === undefined
			? {}
			: { endpoint: env.S3_ENDPOINT }),
		forcePathStyle: env.S3_FORCE_PATH_STYLE,
		publicBaseUrl: env.S3_PUBLIC_BASE_URL!,
		region: env.S3_REGION!,
		secretAccessKey: env.S3_SECRET_ACCESS_KEY!,
	});
}

export const imageStorage = createImageStorage();
