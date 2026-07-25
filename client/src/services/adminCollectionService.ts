import type {
	AdminCollectionCreateInput,
	AdminCollectionDeleteResponse,
	AdminCollectionListParams,
	AdminCollectionListResponse,
	AdminCollectionResponse,
	AdminCollectionUpdateInput,
} from "../types/adminCollection";
import { apiClient } from "./apiClient";

export const adminCollectionService = {
	async getCollections(
		params: AdminCollectionListParams,
		options?: { signal?: AbortSignal },
	): Promise<AdminCollectionListResponse> {
		const response = await apiClient.get<AdminCollectionListResponse>(
			"/admin/collections",
			{ params, signal: options?.signal },
		);
		return response.data;
	},

	async createCollection(
		input: AdminCollectionCreateInput,
	): Promise<AdminCollectionResponse> {
		const response = await apiClient.post<AdminCollectionResponse>(
			"/admin/collections",
			input,
		);
		return response.data;
	},

	async updateCollection(
		id: string,
		input: AdminCollectionUpdateInput,
	): Promise<AdminCollectionResponse> {
		const response = await apiClient.patch<AdminCollectionResponse>(
			`/admin/collections/${encodeURIComponent(id)}`,
			input,
		);
		return response.data;
	},

	async deleteCollection(
		id: string,
	): Promise<AdminCollectionDeleteResponse> {
		const response = await apiClient.delete<AdminCollectionDeleteResponse>(
			`/admin/collections/${encodeURIComponent(id)}`,
		);
		return response.data;
	},
};
