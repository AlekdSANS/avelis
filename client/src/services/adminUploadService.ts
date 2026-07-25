import type {
	AdminProductUploadDeleteResponse,
	AdminProductUploadResponse,
} from "../types/adminUpload";
import { apiClient } from "./apiClient";

export const adminUploadService = {
	async uploadProductImages(
		files: File[],
		onProgress?: (progress: number) => void,
	): Promise<AdminProductUploadResponse> {
		const formData = new FormData();
		files.forEach((file) => formData.append("images", file));

		const response = await apiClient.post<AdminProductUploadResponse>(
			"/admin/uploads/products",
			formData,
			{
				onUploadProgress: (event) => {
					if (event.total === undefined || event.total <= 0) {
						return;
					}

					onProgress?.(
						Math.min(100, Math.round((event.loaded / event.total) * 100)),
					);
				},
			},
		);

		return response.data;
	},

	async deleteProductImage(
		storageKey: string,
	): Promise<AdminProductUploadDeleteResponse> {
		const response =
			await apiClient.delete<AdminProductUploadDeleteResponse>(
				"/admin/uploads/products",
				{ data: { storageKey } },
			);

		return response.data;
	},
};
