export const PRODUCT_UPLOAD_MAX_BYTES = 8 * 1024 * 1024;
export const PRODUCT_UPLOAD_MAX_FILES = 10;

export const PRODUCT_UPLOAD_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp",
] as const;

export type ProductUploadMimeType =
	(typeof PRODUCT_UPLOAD_MIME_TYPES)[number];
