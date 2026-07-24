import type { Request, Response } from "express";
import {
	getCollectionBySlug,
	listCollections,
} from "../services/collectionService.js";

export async function listCollectionsController(_req: Request, res: Response) {
	const result = await listCollections();
	res.status(200).json(result);
}

export async function collectionBySlugController(req: Request, res: Response) {
	const result = await getCollectionBySlug(String(req.params.slug ?? ""));
	res.status(200).json(result);
}
