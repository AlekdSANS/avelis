import { apiClient } from "./apiClient";
import type { ApiResponse, Collection } from "../types";

type RequestOptions = {
  signal?: AbortSignal;
};

export const collectionService = {
  async getCollections(options?: RequestOptions): Promise<Collection[]> {
    const response = await apiClient.get<ApiResponse<Collection[]>>(
      "/collections",
      { signal: options?.signal },
    );

    return response.data.data;
  },

  async getCollectionBySlug(
    slug: string,
    options?: RequestOptions,
  ): Promise<Collection> {
    const response = await apiClient.get<ApiResponse<Collection>>(
      `/collections/${slug}`,
      { signal: options?.signal },
    );

    return response.data.data;
  },
};
