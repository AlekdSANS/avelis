import type { ApiResponse, PaginatedResponse } from "./api";

export type AdminReferenceStatus = "all" | "active" | "inactive";

export interface AdminNoteListParams {
	search?: string;
	status?: AdminReferenceStatus;
	page?: number;
	limit?: number;
}

export interface AdminNote {
	id: string;
	name: string;
	isActive: boolean;
	productCount: number;
	createdAt: string;
	updatedAt: string;
}

export interface AdminNoteCreateInput {
	name: string;
	isActive?: boolean;
}

export interface AdminNoteUpdateInput {
	name?: string;
	isActive?: boolean;
}

export type AdminNoteListResponse = PaginatedResponse<AdminNote>;
export type AdminNoteResponse = ApiResponse<AdminNote>;
export type AdminNoteDeleteResponse = AdminNoteResponse & {
	message: string;
};
