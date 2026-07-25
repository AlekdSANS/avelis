import type { Request, Response } from "express";
import type {
	AdminProductCreateInput,
	AdminProductListQuery,
	AdminProductStatusInput,
	AdminProductUpdateInput,
} from "../schemas/adminProductSchemas.js";
import {
	createAdminProduct,
	getAdminProduct,
	listAdminProductReferenceNotes,
	listAdminProductReferenceCollections,
	listAdminProducts,
	setAdminProductStatus,
	softDeleteAdminProduct,
	updateAdminProduct,
} from "../services/adminProductService.js";

export async function listAdminProductsController(
	_req: Request,
	res: Response,
) {
	const query = res.locals.query as AdminProductListQuery;
	const result = await listAdminProducts(query);

	res.status(200).json(result);
}

export async function adminProductDetailController(
	req: Request,
	res: Response,
) {
	const result = await getAdminProduct(String(req.params.id ?? ""));

	res.status(200).json(result);
}

export async function adminProductReferenceNotesController(
	_req: Request,
	res: Response,
) {
	const result = await listAdminProductReferenceNotes();

	res.status(200).json(result);
}

export async function adminProductReferenceCollectionsController(
	_req: Request,
	res: Response,
) {
	const result = await listAdminProductReferenceCollections();

	res.status(200).json(result);
}

export async function updateAdminProductStatusController(
	req: Request,
	res: Response,
) {
	const input = res.locals.body as AdminProductStatusInput;
	const result = await setAdminProductStatus(
		String(req.params.id ?? ""),
		input,
	);

	res.status(200).json(result);
}

export async function deleteAdminProductController(
	req: Request,
	res: Response,
) {
	const result = await softDeleteAdminProduct(String(req.params.id ?? ""));

	res.status(200).json(result);
}

export async function createAdminProductController(
	_req: Request,
	res: Response,
) {
	const input = res.locals.body as AdminProductCreateInput;
	const result = await createAdminProduct(input);

	res.status(201).json(result);
}

export async function updateAdminProductController(
	req: Request,
	res: Response,
) {
	const input = res.locals.body as AdminProductUpdateInput;
	const result = await updateAdminProduct(String(req.params.id ?? ""), input);

	res.status(200).json(result);
}
