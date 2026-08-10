import { fileTypeFromBuffer } from "file-type";
import {
	PRODUCT_UPLOAD_MIME_TYPES,
	type ProductUploadMimeType,
} from "../config/uploads.js";
import { prisma } from "../lib/prisma.js";
import type { DeleteProductUploadInput } from "../schemas/adminUploadSchemas.js";
import type { ImageStorage, StoredImage } from "../storage/imageStorage.js";
import { imageStorage } from "../storage/index.js";
import { HttpError } from "../utils/httpError.js";

const allowedMimeTypes = new Set<string>(PRODUCT_UPLOAD_MIME_TYPES);

function extensionForMime(
	mimeType: ProductUploadMimeType,
): "jpg" | "png" | "webp" {
	switch (mimeType) {
		case "image/jpeg":
			return "jpg";
		case "image/png":
			return "png";
		case "image/webp":
			return "webp";
	}
}

async function validateFile(file: Express.Multer.File) {
	const detected = await fileTypeFromBuffer(file.buffer);

	if (
		detected === undefined ||
		!allowedMimeTypes.has(detected.mime) ||
		!allowedMimeTypes.has(file.mimetype) ||
		detected.mime !== file.mimetype
	) {
		throw new HttpError(
			400,
			"Each upload must be a valid JPEG, PNG, or WebP image",
		);
	}

	const mimeType = detected.mime as ProductUploadMimeType;

	return {
		buffer: file.buffer,
		mimeType,
		extension: extensionForMime(mimeType),
	};
}

export async function storeAdminProductImages(
	files: Express.Multer.File[],
	storage: ImageStorage = imageStorage,
) {
	if (files.length === 0) {
		throw new HttpError(400, "Select at least one image to upload");
	}

	const stored: StoredImage[] = [];

	try {
		for (const file of files) {
			const validatedFile = await validateFile(file);
			stored.push(await storage.saveProductImage(validatedFile));
		}
	} catch (error) {
		await Promise.allSettled(
			stored.map((image) => storage.deleteProductImage(image.storageKey)),
		);
		throw error;
	}

	return { data: stored };
}

export async function deleteAdminProductUpload(
	input: DeleteProductUploadInput,
	storage: ImageStorage = imageStorage,
) {
	const referenceCount = await prisma.productImage.count({
		where: { storageKey: input.storageKey },
	});
	const managedUrls = [
		storage.getPublicUrl(input.storageKey),
		`/uploads/${input.storageKey}`,
	];
	const collectionReferenceCount = await prisma.collection.count({
		where: {
			OR: [
				{ heroImageUrl: { in: managedUrls } },
				{ cardImageUrl: { in: managedUrls } },
				{ mobileImageUrl: { in: managedUrls } },
			],
		},
	});

	if (referenceCount + collectionReferenceCount > 0) {
		throw new HttpError(
			409,
			"This image is still attached and cannot be removed",
		);
	}

	try {
		const deleted = await storage.deleteProductImage(input.storageKey);

		return {
			data: {
				storageKey: input.storageKey,
				deleted,
			},
			message: deleted
				? "Product image removed"
				: "Product image was already absent",
		};
	} catch (error) {
		if (
			error instanceof Error &&
			error.message === "INVALID_PRODUCT_STORAGE_KEY"
		) {
			throw new HttpError(400, "Invalid managed product image key");
		}

		throw error;
	}
}
