import type { Request, Response } from "express";
import type { DeleteProductUploadInput } from "../schemas/adminUploadSchemas.js";
import {
	deleteAdminProductUpload,
	storeAdminProductImages,
} from "../services/adminUploadService.js";

export async function uploadAdminProductImagesController(
	req: Request,
	res: Response,
) {
	const files = Array.isArray(req.files) ? req.files : [];
	const response = await storeAdminProductImages(files);
	res.status(201).json(response);
}

export async function deleteAdminProductUploadController(
	_req: Request,
	res: Response,
) {
	const response = await deleteAdminProductUpload(
		res.locals.body as DeleteProductUploadInput,
	);
	res.status(200).json(response);
}
