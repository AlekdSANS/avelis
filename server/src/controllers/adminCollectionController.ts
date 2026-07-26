import type { Request, Response } from "express";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListQuery,
	AdminCollectionUpdateInput,
} from "../schemas/adminCollectionSchemas.js";
import {
	archiveAdminCollection,
	createAdminCollection,
	getAdminCollection,
	listAdminCollections,
	updateAdminCollection,
} from "../services/adminCollectionService.js";

export async function listAdminCollectionsController(
	_req: Request,
	res: Response,
) {
	res.status(200).json(
		await listAdminCollections(
			res.locals.query as AdminCollectionListQuery,
		),
	);
}

export async function getAdminCollectionController(
	req: Request,
	res: Response,
) {
	res.status(200).json(
		await getAdminCollection(String(req.params.id ?? "")),
	);
}

export async function createAdminCollectionController(
	_req: Request,
	res: Response,
) {
	res.status(201).json(
		await createAdminCollection(
			res.locals.body as AdminCollectionCreateInput,
		),
	);
}

export async function updateAdminCollectionController(
	req: Request,
	res: Response,
) {
	res.status(200).json(
		await updateAdminCollection(
			String(req.params.id ?? ""),
			res.locals.body as AdminCollectionUpdateInput,
		),
	);
}

export async function deleteAdminCollectionController(
	req: Request,
	res: Response,
) {
	res.status(200).json(
		await archiveAdminCollection(String(req.params.id ?? "")),
	);
}
