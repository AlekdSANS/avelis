import type { Request, Response } from "express";
import {
	getFeaturedProducts,
	getProductBySlug,
	getRelatedProducts,
	listProducts,
} from "../services/productService.js";
import type {
	FeaturedProductsQuery,
	ProductListQuery,
} from "../schemas/productSchemas.js";

export async function listProductsController(_req: Request, res: Response) {
	const query = res.locals.query as ProductListQuery;
	const result = await listProducts(query);
	res.status(200).json(result);
}

export async function featuredProductsController(
	_req: Request,
	res: Response,
) {
	const query = res.locals.query as FeaturedProductsQuery;
	const result = await getFeaturedProducts(query);
	res.status(200).json(result);
}

export async function productBySlugController(req: Request, res: Response) {
	const result = await getProductBySlug(String(req.params.slug ?? ""));
	res.status(200).json(result);
}

export async function relatedProductsController(req: Request, res: Response) {
	const result = await getRelatedProducts(String(req.params.productId ?? ""));
	res.status(200).json(result);
}
