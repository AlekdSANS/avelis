import {
	keepPreviousData,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { adminOrderService } from "../../../services/adminOrderService";
import type {
	AdminOrderDetailResponse,
	AdminOrderListParams,
	AdminOrderStatusUpdateInput,
	AdminPaymentStatusUpdateInput,
} from "../../../types/adminOrder";
import { adminKeys } from "./useAdminDashboard";

export const adminOrderKeys = {
	all: ["admin", "orders"] as const,
	lists: () => adminOrderKeys.all,
	list: (params: AdminOrderListParams) =>
		[...adminOrderKeys.lists(), params] as const,
	details: () => ["admin", "order"] as const,
	detail: (orderNumber: string) =>
		[...adminOrderKeys.details(), orderNumber] as const,
};

function retryAdminOrderQuery(failureCount: number, error: Error) {
	if (
		error instanceof ApiClientError &&
		[401, 403, 404].includes(error.statusCode ?? 0)
	) {
		return false;
	}

	return failureCount < 1;
}

async function updateOrderCaches(
	queryClient: ReturnType<typeof useQueryClient>,
	response: AdminOrderDetailResponse,
) {
	queryClient.setQueryData(
		adminOrderKeys.detail(response.data.orderNumber),
		response,
	);

	await Promise.all([
		queryClient.invalidateQueries({ queryKey: adminOrderKeys.lists() }),
		queryClient.invalidateQueries({ queryKey: adminKeys.dashboard }),
	]);
}

export function useAdminOrders(params: AdminOrderListParams) {
	return useQuery({
		queryKey: adminOrderKeys.list(params),
		queryFn: ({ signal }) =>
			adminOrderService.getOrders(params, { signal }),
		placeholderData: keepPreviousData,
		staleTime: 30_000,
		retry: retryAdminOrderQuery,
	});
}

export function useAdminOrder(orderNumber?: string) {
	return useQuery({
		queryKey: adminOrderKeys.detail(orderNumber ?? ""),
		queryFn: ({ signal }) =>
			adminOrderService.getOrderByNumber(orderNumber ?? "", { signal }),
		enabled: Boolean(orderNumber),
		staleTime: 30_000,
		retry: retryAdminOrderQuery,
	});
}

export function useUpdateAdminOrderStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			orderNumber,
			input,
		}: {
			orderNumber: string;
			input: AdminOrderStatusUpdateInput;
		}) => adminOrderService.updateOrderStatus(orderNumber, input),
		retry: false,
		onSuccess: (response) => updateOrderCaches(queryClient, response),
	});
}

export function useUpdateAdminPaymentStatus() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			orderNumber,
			input,
		}: {
			orderNumber: string;
			input: AdminPaymentStatusUpdateInput;
		}) => adminOrderService.updatePaymentStatus(orderNumber, input),
		retry: false,
		onSuccess: (response) => updateOrderCaches(queryClient, response),
	});
}
