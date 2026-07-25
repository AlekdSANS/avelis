import type { ApiResponse } from "./api";

export interface AdminProductUpload {
	url: string;
	storageKey: string;
	mimeType: "image/jpeg" | "image/png" | "image/webp";
	sizeBytes: number;
}

export type AdminProductUploadResponse = ApiResponse<AdminProductUpload[]>;

export type AdminProductUploadDeleteResponse = ApiResponse<{
	storageKey: string;
	deleted: boolean;
}> & {
	message: string;
};
