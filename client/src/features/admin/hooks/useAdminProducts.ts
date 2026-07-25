import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { adminProductService } from "../../../services/adminProductService";
import type {
	AdminProductCreateInput,
	AdminProductDetailResponse,
	AdminProductListParams,
	AdminProductStatusInput,
	AdminProductUpdateInput,
} from "../../../types/adminProduct";
import { collectionKeys } from "../../collections/hooks/useCollections";
import { productKeys } from "../../products/hooks/useProducts";
import { adminKeys } from "./useAdminDashboard";

export const adminProductKeys = {
	all: ["admin", "products"] as const,
	lists: () => adminProductKeys.all,
	list: (params: AdminProductListParams) =>
		[...adminProductKeys.lists(), params] as const,
	details: () => ["admin", "product"] as const,
	detail: (id: string) => [...adminProductKeys.details(), id] as const,
	referenceNotes: () => ["admin", "product-reference-notes"] as const,
	referenceCollections: () =>
		["admin", "product-reference-collections"] as const,
};

function retryAdminQuery(failureCount: number, error: Error) {
	if (
		error instanceof ApiClientError &&
		(error.statusCode === 401 || error.statusCode === 403)
	) {
		return false;
	}

	return failureCount < 1;
}

async function invalidateProductCaches(
	queryClient: ReturnType<typeof useQueryClient>,
	params: {
		id?: string;
		slugs: string[];
		collectionsChanged?: boolean;
	},
) {
	const tasks = [
		queryClient.invalidateQueries({ queryKey: adminProductKeys.lists() }),
		queryClient.invalidateQueries({ queryKey: productKeys.lists() }),
		queryClient.invalidateQueries({ queryKey: productKeys.featuredLists() }),
		queryClient.invalidateQueries({ queryKey: adminKeys.dashboard }),
		...params.slugs.map((slug) =>
			queryClient.invalidateQueries({
				queryKey: productKeys.detail(slug),
			}),
		),
	];

	if (params.id !== undefined) {
		tasks.push(
			queryClient.invalidateQueries({
				queryKey: adminProductKeys.detail(params.id),
			}),
		);
	}

	if (params.collectionsChanged) {
		tasks.push(
			queryClient.invalidateQueries({ queryKey: collectionKeys.all }),
		);
	}

	await Promise.all(tasks);
}

function getCachedAdminProduct(
	queryClient: ReturnType<typeof useQueryClient>,
	id: string,
) {
	return queryClient.getQueryData<AdminProductDetailResponse>(
		adminProductKeys.detail(id),
	);
}

export function useAdminProducts(params: AdminProductListParams) {
	return useQuery({
		queryKey: adminProductKeys.list(params),
		queryFn: ({ signal }) =>
			adminProductService.getProducts(params, { signal }),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		retry: retryAdminQuery,
	});
}

export function useAdminProduct(id?: string) {
	return useQuery({
		queryKey: adminProductKeys.detail(id ?? ""),
		queryFn: ({ signal }) =>
			adminProductService.getProductById(id ?? "", { signal }),
		enabled: Boolean(id),
		staleTime: 60_000,
		retry: retryAdminQuery,
	});
}

export function useAdminProductReferenceNotes() {
	return useQuery({
		queryKey: adminProductKeys.referenceNotes(),
		queryFn: ({ signal }) =>
			adminProductService.getReferenceNotes({ signal }),
		staleTime: 10 * 60_000,
		retry: retryAdminQuery,
	});
}

export function useAdminProductReferenceCollections() {
	return useQuery({
		queryKey: adminProductKeys.referenceCollections(),
		queryFn: ({ signal }) =>
			adminProductService.getReferenceCollections({ signal }),
		staleTime: 10 * 60_000,
		retry: retryAdminQuery,
	});
}

export function useCreateAdminProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (input: AdminProductCreateInput) =>
			adminProductService.createProduct(input),
		retry: false,
		onSuccess: async (response, input) => {
			queryClient.setQueryData(
				adminProductKeys.detail(response.data.id),
				response,
			);
			await invalidateProductCaches(queryClient, {
				id: response.data.id,
				slugs: [response.data.slug],
				collectionsChanged: (input.collectionIds?.length ?? 0) > 0,
			});
		},
	});
}

export function useUpdateAdminProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string;
			input: AdminProductUpdateInput;
		}) => adminProductService.updateProduct(id, input),
		retry: false,
		onSuccess: async (response, variables) => {
			const previous = getCachedAdminProduct(queryClient, variables.id);
			queryClient.setQueryData(
				adminProductKeys.detail(variables.id),
				response,
			);
			await invalidateProductCaches(queryClient, {
				id: variables.id,
				slugs: [
					...new Set(
						[previous?.data.slug, response.data.slug].filter(
							(slug): slug is string => slug !== undefined,
						),
					),
				],
				collectionsChanged: variables.input.collectionIds !== undefined,
			});
		},
	});
}

export function useUpdateAdminProductStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			id,
			input,
		}: {
			id: string;
			input: AdminProductStatusInput;
		}) => adminProductService.updateProductStatus(id, input),
		retry: false,
		onSuccess: async (response, variables) => {
			await invalidateProductCaches(queryClient, {
				id: variables.id,
				slugs: [response.data.slug],
			});
		},
	});
}

export function useDeleteAdminProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => adminProductService.deleteProduct(id),
		retry: false,
		onSuccess: async (response, id) => {
			await invalidateProductCaches(queryClient, {
				id,
				slugs: [response.data.slug],
			});
		},
	});
}
