import type { Request, Response } from "express";
import type {
	AdminProductListQuery,
	AdminProductStatusInput,
} from "../schemas/adminProductSchemas.js";
import {
	getAdminProduct,
	listAdminProducts,
	setAdminProductStatus,
	softDeleteAdminProduct,
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
