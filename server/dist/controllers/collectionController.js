import { getCollectionBySlug, listCollections, } from "../services/collectionService.js";
export async function listCollectionsController(_req, res) {
    const result = await listCollections();
    res.status(200).json(result);
}
export async function collectionBySlugController(req, res) {
    const result = await getCollectionBySlug(String(req.params.slug ?? ""));
    res.status(200).json(result);
}
//# sourceMappingURL=collectionController.js.map