import { apiClient } from "./apiClient";
import type { AdminMerchandising, ApiResponse, MerchandisingCampaign, ProductMerchandising, PromotionValidation } from "../types";
export const merchandisingService = {
  async getCampaigns() { return (await apiClient.get<ApiResponse<MerchandisingCampaign[]>>("/merchandising/campaigns")).data.data; },
  async getProduct(productId: string) { return (await apiClient.get<ApiResponse<ProductMerchandising>>(`/merchandising/products/${productId}`)).data.data; },
  async validatePromotion(code: string, subtotal: number) { return (await apiClient.post<ApiResponse<PromotionValidation>>("/merchandising/promotions/validate", { code, subtotal })).data.data; },
  async subscribeStock(productId: string, email: string) { return (await apiClient.post("/merchandising/stock-alerts", { productId, email })).data; },
  async getAdmin() { return (await apiClient.get<ApiResponse<AdminMerchandising>>("/admin/merchandising")).data.data; },
  async createCampaign(input: unknown) { return (await apiClient.post("/admin/merchandising/campaigns", input)).data; },
  async updateCampaign(id: string, input: unknown) { return (await apiClient.patch(`/admin/merchandising/campaigns/${id}`, input)).data; },
  async deleteCampaign(id: string) { await apiClient.delete(`/admin/merchandising/campaigns/${id}`); },
  async createPromotion(input: unknown) { return (await apiClient.post("/admin/merchandising/promotions", input)).data; },
  async updatePromotion(id: string, input: unknown) { return (await apiClient.patch(`/admin/merchandising/promotions/${id}`, input)).data; },
  async deletePromotion(id: string) { await apiClient.delete(`/admin/merchandising/promotions/${id}`); },
  async updateProduct(id: string, input: unknown) { return (await apiClient.patch(`/admin/merchandising/products/${id}`, input)).data; },
  async updateAlert(id: string, status: "NOTIFIED" | "CANCELLED") { return (await apiClient.patch(`/admin/merchandising/alerts/${id}`, { status })).data; },
};
