import type {
	AdminProductCreateInput,
	AdminProductDeleteResponse,
	AdminProductDetailResponse,
	AdminProductListParams,
	AdminProductListResponse,
	AdminProductReferenceNotesResponse,
	AdminProductStatusInput,
	AdminProductSummaryResponse,
	AdminProductUpdateInput,
} from "../types/adminProduct";
import { apiClient } from "./apiClient";

type RequestOptions = {
	signal?: AbortSignal;
};

function buildAdminProductSearchParams(params: AdminProductListParams) {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (
			value === undefined ||
			value === "" ||
			(key === "status" && value === "all") ||
			(key === "format" && value === "all") ||
			(key === "stock" && value === "all") ||
			(key === "sort" && value === "newest") ||
			(key === "page" && value === 1) ||
			(key === "limit" && value === 20)
		) {
			return;
		}

		searchParams.set(key, String(value));
	});

	return searchParams;
}

export const adminProductService = {
	async getProducts(
		params: AdminProductListParams,
		options?: RequestOptions,
	): Promise<AdminProductListResponse> {
		const response = await apiClient.get<AdminProductListResponse>(
			"/admin/products",
			{
				params: buildAdminProductSearchParams(params),
				signal: options?.signal,
			},
		);

		return response.data;
	},

	async getProductById(
		id: string,
		options?: RequestOptions,
	): Promise<AdminProductDetailResponse> {
		const response = await apiClient.get<AdminProductDetailResponse>(
			`/admin/products/${encodeURIComponent(id)}`,
			{ signal: options?.signal },
		);

		return response.data;
	},

	async getReferenceNotes(
		options?: RequestOptions,
	): Promise<AdminProductReferenceNotesResponse> {
		const response = await apiClient.get<AdminProductReferenceNotesResponse>(
			"/admin/products/references/notes",
			{ signal: options?.signal },
		);

		return response.data;
	},

	async createProduct(
		input: AdminProductCreateInput,
	): Promise<AdminProductDetailResponse> {
		const response = await apiClient.post<AdminProductDetailResponse>(
			"/admin/products",
			input,
		);

		return response.data;
	},

	async updateProduct(
		id: string,
		input: AdminProductUpdateInput,
	): Promise<AdminProductDetailResponse> {
		const response = await apiClient.patch<AdminProductDetailResponse>(
			`/admin/products/${encodeURIComponent(id)}`,
			input,
		);

		return response.data;
	},

	async updateProductStatus(
		id: string,
		input: AdminProductStatusInput,
	): Promise<AdminProductSummaryResponse> {
		const response = await apiClient.patch<AdminProductSummaryResponse>(
			`/admin/products/${encodeURIComponent(id)}/status`,
			input,
		);

		return response.data;
	},

	async deleteProduct(id: string): Promise<AdminProductDeleteResponse> {
		const response = await apiClient.delete<AdminProductDeleteResponse>(
			`/admin/products/${encodeURIComponent(id)}`,
		);

		return response.data;
	},
};
