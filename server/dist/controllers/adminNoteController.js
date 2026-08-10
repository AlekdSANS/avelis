import { createAdminNote, listAdminNotes, softDeleteAdminNote, updateAdminNote, } from "../services/adminNoteService.js";
export async function listAdminNotesController(_req, res) {
    res.status(200).json(await listAdminNotes(res.locals.query));
}
export async function createAdminNoteController(_req, res) {
    res.status(201).json(await createAdminNote(res.locals.body));
}
export async function updateAdminNoteController(req, res) {
    res.status(200).json(await updateAdminNote(String(req.params.id ?? ""), res.locals.body));
}
export async function deleteAdminNoteController(req, res) {
    res.status(200).json(await softDeleteAdminNote(String(req.params.id ?? "")));
}
//# sourceMappingURL=adminNoteController.js.map