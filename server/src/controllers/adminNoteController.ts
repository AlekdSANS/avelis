import type { Request, Response } from "express";
import type {
	AdminNoteCreateInput,
	AdminNoteListQuery,
	AdminNoteUpdateInput,
} from "../schemas/adminNoteSchemas.js";
import {
	createAdminNote,
	listAdminNotes,
	softDeleteAdminNote,
	updateAdminNote,
} from "../services/adminNoteService.js";

export async function listAdminNotesController(
	_req: Request,
	res: Response,
) {
	res.status(200).json(
		await listAdminNotes(res.locals.query as AdminNoteListQuery),
	);
}

export async function createAdminNoteController(
	_req: Request,
	res: Response,
) {
	res.status(201).json(
		await createAdminNote(res.locals.body as AdminNoteCreateInput),
	);
}

export async function updateAdminNoteController(
	req: Request,
	res: Response,
) {
	res.status(200).json(
		await updateAdminNote(
			String(req.params.id ?? ""),
			res.locals.body as AdminNoteUpdateInput,
		),
	);
}

export async function deleteAdminNoteController(
	req: Request,
	res: Response,
) {
	res.status(200).json(
		await softDeleteAdminNote(String(req.params.id ?? "")),
	);
}
