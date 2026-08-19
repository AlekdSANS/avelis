import type { Product } from "./product";
export type CampaignType = "GIFT_SET" | "CURATED_EDIT"; export type MerchandisingStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export interface MerchandisingCampaign { id: string; slug: string; type: CampaignType; title: string; eyebrow: string | null; description: string; imageUrl: string | null; status: MerchandisingStatus; isFeatured: boolean; startsAt: string | null; endsAt: string | null; productIds: string[]; products: Product[]; createdAt: string; updatedAt: string; }
export interface PromotionCode { id: string; code: string; description: string; discountType: "PERCENT" | "FIXED"; amount: number; minSubtotal: number; startsAt: string | null; endsAt: string | null; usageLimit: number | null; usageCount: number; isActive: boolean; createdAt: string; updatedAt: string; }
export interface StockAlert { id: string; email: string; productId: string; status: "PENDING" | "NOTIFIED" | "CANCELLED"; notifiedAt: string | null; createdAt: string; product: { name: string; slug: string }; }
export interface MerchandisingProductAdmin { id: string; name: string; slug: string; lowStockThreshold: number; sampleAvailable: boolean; samplePrice: number | null; backInStockEnabled: boolean; }
export interface AdminMerchandising { campaigns: MerchandisingCampaign[]; promotions: PromotionCode[]; alerts: StockAlert[]; products: MerchandisingProductAdmin[]; }
export interface ProductMerchandising { sampleAvailable: boolean; samplePrice: number | null; lowStock: boolean; outOfStock: boolean; backInStockEnabled: boolean; recommendations: Product[]; }
export interface PromotionValidation { code: string; description: string; discount: number; }
