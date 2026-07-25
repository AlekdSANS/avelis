import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { adminNoteService } from "../../../services/adminNoteService";
import type {
	AdminNoteCreateInput,
	AdminNoteListParams,
	AdminNoteUpdateInput,
} from "../../../types/adminNote";
import { adminProductKeys } from "./useAdminProducts";

export const adminNoteKeys = {
	all: ["admin", "notes"] as const,
	list: (params: AdminNoteListParams) =>
		[...adminNoteKeys.all, params] as const,
};

export function useAdminNotes(params: AdminNoteListParams) {
	return useQuery({
		queryKey: adminNoteKeys.list(params),
		queryFn: ({ signal }) => adminNoteService.getNotes(params, { signal }),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

function useInvalidateNoteQueries() {
	const queryClient = useQueryClient();

	return async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: adminNoteKeys.all }),
			queryClient.invalidateQueries({
				queryKey: adminProductKeys.referenceNotes(),
			}),
			queryClient.invalidateQueries({
				queryKey: adminProductKeys.details(),
			}),
		]);
	};
}

export function useCreateAdminNote() {
	const invalidate = useInvalidateNoteQueries();

	return useMutation({
		mutationFn: (input: AdminNoteCreateInput) =>
			adminNoteService.createNote(input),
		retry: false,
		onSuccess: invalidate,
	});
}

export function useUpdateAdminNote() {
	const invalidate = useInvalidateNoteQueries();

	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string;
			input: AdminNoteUpdateInput;
		}) => adminNoteService.updateNote(id, input),
		retry: false,
		onSuccess: invalidate,
	});
}

export function useDeleteAdminNote() {
	const invalidate = useInvalidateNoteQueries();

	return useMutation({
		mutationFn: (id: string) => adminNoteService.deleteNote(id),
		retry: false,
		onSuccess: invalidate,
	});
}
