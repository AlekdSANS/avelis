import { deleteAdminProductUpload, storeAdminProductImages, } from "../services/adminUploadService.js";
export async function uploadAdminProductImagesController(req, res) {
    const files = Array.isArray(req.files) ? req.files : [];
    const response = await storeAdminProductImages(files);
    res.status(201).json(response);
}
export const uploadAdminCollectionImagesController = uploadAdminProductImagesController;
export async function deleteAdminProductUploadController(_req, res) {
    const response = await deleteAdminProductUpload(res.locals.body);
    res.status(200).json(response);
}
export const deleteAdminCollectionUploadController = deleteAdminProductUploadController;
//# sourceMappingURL=adminUploadController.js.map