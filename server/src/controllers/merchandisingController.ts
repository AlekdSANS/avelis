import type { Request, Response } from "express";
import type { CampaignInput, CampaignUpdateInput, ProductMerchandisingInput, PromotionInput, PromotionUpdateInput, StockAlertInput } from "../schemas/merchandisingSchemas.js";
import { createCampaign, createPromotion, deleteCampaign, deletePromotion, getAdminMerchandising, getProductMerchandising, listPublicCampaigns, subscribeStockAlert, updateCampaign, updateProductMerchandising, updatePromotion, updateStockAlert, validatePromotion } from "../services/merchandisingService.js";
export async function campaignsController(_req: Request, res: Response) { res.json(await listPublicCampaigns()); }
export async function productMerchandisingController(req: Request, res: Response) { res.json(await getProductMerchandising(String(req.params.productId ?? ""))); }
export async function validatePromotionController(_req: Request, res: Response) { const body = res.locals.body as { code: string; subtotal: number }; res.json(await validatePromotion(body.code, body.subtotal)); }
export async function stockAlertController(req: Request, res: Response) { res.status(201).json(await subscribeStockAlert(res.locals.body as StockAlertInput, req.authUser?.id)); }
export async function adminMerchandisingController(_req: Request, res: Response) { res.json(await getAdminMerchandising()); }
export async function createCampaignController(_req: Request, res: Response) { res.status(201).json(await createCampaign(res.locals.body as CampaignInput)); }
export async function updateCampaignController(req: Request, res: Response) { res.json(await updateCampaign(String(req.params.id ?? ""), res.locals.body as CampaignUpdateInput)); }
export async function deleteCampaignController(req: Request, res: Response) { res.json(await deleteCampaign(String(req.params.id ?? ""))); }
export async function createPromotionController(_req: Request, res: Response) { res.status(201).json(await createPromotion(res.locals.body as PromotionInput)); }
export async function updatePromotionController(req: Request, res: Response) { res.json(await updatePromotion(String(req.params.id ?? ""), res.locals.body as PromotionUpdateInput)); }
export async function deletePromotionController(req: Request, res: Response) { res.json(await deletePromotion(String(req.params.id ?? ""))); }
export async function updateProductMerchandisingController(req: Request, res: Response) { res.json(await updateProductMerchandising(String(req.params.id ?? ""), res.locals.body as ProductMerchandisingInput)); }
export async function updateStockAlertController(req: Request, res: Response) { const body = res.locals.body as { status: "NOTIFIED" | "CANCELLED" }; res.json(await updateStockAlert(String(req.params.id ?? ""), body.status)); }
