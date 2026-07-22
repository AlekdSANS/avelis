import { apiClient } from "./apiClient";
import type { ApiResponse, Product } from "../types";

export const wishlistService = {
  async getWishlist(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      "/wishlist",
    );

    return response.data.data;
  },

  async addProduct(productId: string): Promise<Product[]> {
    const response = await apiClient.post<ApiResponse<Product[]>>(
      `/wishlist/${productId}`,
    );

    return response.data.data;
  },

  async removeProduct(productId: string): Promise<Product[]> {
    const response = await apiClient.delete<ApiResponse<Product[]>>(
      `/wishlist/${productId}`,
    );

    return response.data.data;
  },
};
