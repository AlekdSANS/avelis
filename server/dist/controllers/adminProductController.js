import { createAdminProduct, getAdminProduct, listAdminProductReferenceNotes, listAdminProductReferenceCollections, listAdminProducts, setAdminProductStatus, softDeleteAdminProduct, updateAdminProduct, } from "../services/adminProductService.js";
export async function listAdminProductsController(_req, res) {
    const query = res.locals.query;
    const result = await listAdminProducts(query);
    res.status(200).json(result);
}
export async function adminProductDetailController(req, res) {
    const result = await getAdminProduct(String(req.params.id ?? ""));
    res.status(200).json(result);
}
export async function adminProductReferenceNotesController(_req, res) {
    const result = await listAdminProductReferenceNotes();
    res.status(200).json(result);
}
export async function adminProductReferenceCollectionsController(_req, res) {
    const result = await listAdminProductReferenceCollections();
    res.status(200).json(result);
}
export async function updateAdminProductStatusController(req, res) {
    const input = res.locals.body;
    const result = await setAdminProductStatus(String(req.params.id ?? ""), input);
    res.status(200).json(result);
}
export async function deleteAdminProductController(req, res) {
    const result = await softDeleteAdminProduct(String(req.params.id ?? ""));
    res.status(200).json(result);
}
export async function createAdminProductController(_req, res) {
    const input = res.locals.body;
    const result = await createAdminProduct(input);
    res.status(201).json(result);
}
export async function updateAdminProductController(req, res) {
    const input = res.locals.body;
    const result = await updateAdminProduct(String(req.params.id ?? ""), input);
    res.status(200).json(result);
}
//# sourceMappingURL=adminProductController.js.map