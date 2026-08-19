import { apiClient } from "./apiClient";
import type { ApiResponse, JournalArticle, JournalArticleInput, Review, ReviewStatus } from "../types";
export const growthService = {
  async getArticles() { return (await apiClient.get<ApiResponse<JournalArticle[]>>("/journal")).data.data; },
  async getArticle(slug: string) { return (await apiClient.get<ApiResponse<JournalArticle>>(`/journal/${slug}`)).data.data; },
  async getProductReviews(slug: string) { return (await apiClient.get<ApiResponse<Review[]>>(`/products/${slug}/reviews`)).data.data; },
  async submitReview(slug: string, input: { rating: number; title?: string | null; content?: string | null }) { return (await apiClient.post<ApiResponse<Review>>(`/products/${slug}/reviews`, input)).data; },
  async getAdminArticles() { return (await apiClient.get<ApiResponse<JournalArticle[]>>("/admin/growth/articles")).data.data; },
  async createArticle(input: JournalArticleInput) { return (await apiClient.post<ApiResponse<JournalArticle>>("/admin/growth/articles", input)).data.data; },
  async updateArticle(id: string, input: Partial<JournalArticleInput>) { return (await apiClient.patch<ApiResponse<JournalArticle>>(`/admin/growth/articles/${id}`, input)).data.data; },
  async deleteArticle(id: string) { await apiClient.delete(`/admin/growth/articles/${id}`); },
  async getAdminReviews() { return (await apiClient.get<ApiResponse<Review[]>>("/admin/growth/reviews")).data.data; },
  async moderateReview(id: string, status: Exclude<ReviewStatus, "PENDING">) { return (await apiClient.patch<ApiResponse<Review>>(`/admin/growth/reviews/${id}`, { status })).data.data; },
};
