import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { adminCollectionService } from "../../../services/adminCollectionService";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListParams,
	AdminCollectionUpdateInput,
} from "../../../types/adminCollection";
import { collectionKeys } from "../../collections/hooks/useCollections";
import { adminProductKeys } from "./useAdminProducts";

export const adminCollectionKeys = {
	all: ["admin", "collections"] as const,
	list: (params: AdminCollectionListParams) =>
		[...adminCollectionKeys.all, params] as const,
};

export function useAdminCollections(params: AdminCollectionListParams) {
	return useQuery({
		queryKey: adminCollectionKeys.list(params),
		queryFn: ({ signal }) =>
			adminCollectionService.getCollections(params, { signal }),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
	});
}

function useInvalidateCollectionQueries() {
	const queryClient = useQueryClient();
	return async () => {
		await Promise.all([
			queryClient.invalidateQueries({ queryKey: adminCollectionKeys.all }),
			queryClient.invalidateQueries({ queryKey: collectionKeys.all }),
			queryClient.invalidateQueries({
				queryKey: adminProductKeys.referenceCollections(),
			}),
			queryClient.invalidateQueries({
				queryKey: adminProductKeys.details(),
			}),
		]);
	};
}

export function useCreateAdminCollection() {
	const invalidate = useInvalidateCollectionQueries();
	return useMutation({
		mutationFn: (input: AdminCollectionCreateInput) =>
			adminCollectionService.createCollection(input),
		retry: false,
		onSuccess: invalidate,
	});
}

export function useUpdateAdminCollection() {
	const invalidate = useInvalidateCollectionQueries();
	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string;
			input: AdminCollectionUpdateInput;
		}) => adminCollectionService.updateCollection(id, input),
		retry: false,
		onSuccess: invalidate,
	});
}

export function useDeleteAdminCollection() {
	const invalidate = useInvalidateCollectionQueries();
	return useMutation({
		mutationFn: (id: string) =>
			adminCollectionService.deleteCollection(id),
		retry: false,
		onSuccess: invalidate,
	});
}
