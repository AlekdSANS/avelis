import type {
	AdminNoteCreateInput,
	AdminNoteDeleteResponse,
	AdminNoteListParams,
	AdminNoteListResponse,
	AdminNoteResponse,
	AdminNoteUpdateInput,
} from "../types/adminNote";
import { apiClient } from "./apiClient";

export const adminNoteService = {
	async getNotes(
		params: AdminNoteListParams,
		options?: { signal?: AbortSignal },
	): Promise<AdminNoteListResponse> {
		const response = await apiClient.get<AdminNoteListResponse>(
			"/admin/notes",
			{ params, signal: options?.signal },
		);
		return response.data;
	},

	async createNote(
		input: AdminNoteCreateInput,
	): Promise<AdminNoteResponse> {
		const response = await apiClient.post<AdminNoteResponse>(
			"/admin/notes",
			input,
		);
		return response.data;
	},

	async updateNote(
		id: string,
		input: AdminNoteUpdateInput,
	): Promise<AdminNoteResponse> {
		const response = await apiClient.patch<AdminNoteResponse>(
			`/admin/notes/${encodeURIComponent(id)}`,
			input,
		);
		return response.data;
	},

	async deleteNote(id: string): Promise<AdminNoteDeleteResponse> {
		const response = await apiClient.delete<AdminNoteDeleteResponse>(
			`/admin/notes/${encodeURIComponent(id)}`,
		);
		return response.data;
	},
};
