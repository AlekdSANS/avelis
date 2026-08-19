import { apiClient } from "./apiClient";
import type {
  ApiResponse,
  PaginatedResponse,
  Product,
  ProductQueryParams,
} from "../types";

type RequestOptions = {
  signal?: AbortSignal;
};

function buildProductSearchParams(params?: ProductQueryParams) {
  const searchParams = new URLSearchParams();

  if (!params) {
    return searchParams;
  }

  Object.entries(params).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === "" ||
      value === false ||
      (key === "page" && value === 1) ||
      (key === "limit" && value === 12) ||
      (key === "sort" && value === "featured")
    ) {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
}

export const productService = {
  async getProducts(
    params?: ProductQueryParams,
    options?: RequestOptions,
  ): Promise<PaginatedResponse<Product>> {
    const searchParams = buildProductSearchParams(params);
    const response = await apiClient.get<PaginatedResponse<Product>>(
      "/products",
      {
        params: searchParams,
        signal: options?.signal,
      },
    );

    return response.data;
  },

  async getProductBySlug(
    slug: string,
    options?: RequestOptions,
  ): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/products/${slug}`,
      { signal: options?.signal },
    );

    return response.data.data;
  },

  async getFeaturedProducts(
    limit?: number,
    options?: RequestOptions,
  ): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      "/products/featured",
      {
        params: limit ? new URLSearchParams({ limit: String(limit) }) : undefined,
        signal: options?.signal,
      },
    );

    return response.data.data;
  },

  async getRelatedProducts(
    productId: string,
    options?: RequestOptions,
  ): Promise<Product[]> {
    const response = await apiClient.get<ApiResponse<Product[]>>(
      `/products/related/${productId}`,
      { signal: options?.signal },
    );

    return response.data.data;
  },
};
