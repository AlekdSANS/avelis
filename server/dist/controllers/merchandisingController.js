import { createCampaign, createPromotion, deleteCampaign, deletePromotion, getAdminMerchandising, getProductMerchandising, listPublicCampaigns, subscribeStockAlert, updateCampaign, updateProductMerchandising, updatePromotion, updateStockAlert, validatePromotion } from "../services/merchandisingService.js";
export async function campaignsController(_req, res) { res.json(await listPublicCampaigns()); }
export async function productMerchandisingController(req, res) { res.json(await getProductMerchandising(String(req.params.productId ?? ""))); }
export async function validatePromotionController(_req, res) { const body = res.locals.body; res.json(await validatePromotion(body.code, body.subtotal)); }
export async function stockAlertController(req, res) { res.status(201).json(await subscribeStockAlert(res.locals.body, req.authUser?.id)); }
export async function adminMerchandisingController(_req, res) { res.json(await getAdminMerchandising()); }
export async function createCampaignController(_req, res) { res.status(201).json(await createCampaign(res.locals.body)); }
export async function updateCampaignController(req, res) { res.json(await updateCampaign(String(req.params.id ?? ""), res.locals.body)); }
export async function deleteCampaignController(req, res) { res.json(await deleteCampaign(String(req.params.id ?? ""))); }
export async function createPromotionController(_req, res) { res.status(201).json(await createPromotion(res.locals.body)); }
export async function updatePromotionController(req, res) { res.json(await updatePromotion(String(req.params.id ?? ""), res.locals.body)); }
export async function deletePromotionController(req, res) { res.json(await deletePromotion(String(req.params.id ?? ""))); }
export async function updateProductMerchandisingController(req, res) { res.json(await updateProductMerchandising(String(req.params.id ?? ""), res.locals.body)); }
export async function updateStockAlertController(req, res) { const body = res.locals.body; res.json(await updateStockAlert(String(req.params.id ?? ""), body.status)); }
//# sourceMappingURL=merchandisingController.js.map