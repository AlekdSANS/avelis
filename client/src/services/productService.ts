import { apiClient } from "./apiClient";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductQueryParams,
} from "../types";

export const productService = {
  async getProducts(
    params?: ProductQueryParams,
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      { params },
    );

    return response.data;
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${slug}`,
    );

    return response.data.data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      "/products/featured",
    );

    return response.data.data;
  },

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products/related/${productId}`,
    );

    return response.data.data;
  },
};
