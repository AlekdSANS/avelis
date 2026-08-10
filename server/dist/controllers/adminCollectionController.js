import { archiveAdminCollection, createAdminCollection, getAdminCollection, listAdminCollections, updateAdminCollection, } from "../services/adminCollectionService.js";
export async function listAdminCollectionsController(_req, res) {
    res.status(200).json(await listAdminCollections(res.locals.query));
}
export async function getAdminCollectionController(req, res) {
    res.status(200).json(await getAdminCollection(String(req.params.id ?? "")));
}
export async function createAdminCollectionController(_req, res) {
    res.status(201).json(await createAdminCollection(res.locals.body));
}
export async function updateAdminCollectionController(req, res) {
    res.status(200).json(await updateAdminCollection(String(req.params.id ?? ""), res.locals.body));
}
export async function deleteAdminCollectionController(req, res) {
    res.status(200).json(await archiveAdminCollection(String(req.params.id ?? "")));
}
//# sourceMappingURL=adminCollectionController.js.map