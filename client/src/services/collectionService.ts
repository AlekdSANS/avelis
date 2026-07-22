import { apiClient } from "./apiClient";
import type { ApiResponse, Collection } from "../types";

export const collectionService = {
  async getCollections(): Promise<Collection[]> {
    const response = await apiClient.get<ApiResponse<Collection[]>>(
      "/collections",
    );

    return response.data.data;
  },

  async getCollectionBySlug(slug: string): Promise<Collection> {
    const response = await apiClient.get<ApiResponse<Collection>>(
      `/collections/${slug}`,
    );

    return response.data.data;
  },
};
