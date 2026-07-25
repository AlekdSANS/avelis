import type { ApiResponse, PaginatedResponse } from "./api";
import type { AdminReferenceStatus } from "./adminNote";

export interface AdminCollectionListParams {
	search?: string;
	status?: AdminReferenceStatus;
	page?: number;
	limit?: number;
}

export interface AdminCollection {
	id: string;
	name: string;
	slug: string;
	description: string;
	imageUrl: string | null;
	isActive: boolean;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface AdminCollectionCreateInput {
	name: string;
	slug: string;
	description: string;
	imageUrl?: string | null;
	isActive?: boolean;
}

export interface AdminCollectionUpdateInput {
	name?: string;
	slug?: string;
	description?: string;
	imageUrl?: string | null;
	isActive?: boolean;
}

export type AdminCollectionListResponse =
	PaginatedResponse<AdminCollection>;
export type AdminCollectionResponse = ApiResponse<AdminCollection>;
export type AdminCollectionDeleteResponse = AdminCollectionResponse & {
	message: string;
};
