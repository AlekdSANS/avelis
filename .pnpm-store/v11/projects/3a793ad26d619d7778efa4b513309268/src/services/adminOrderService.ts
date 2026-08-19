import type {
	AdminOrderDetailResponse,
	AdminOrderListParams,
	AdminOrderListResponse,
	AdminOrderStatusUpdateInput,
	AdminPaymentStatusUpdateInput,
} from "../types/adminOrder";
import { apiClient } from "./apiClient";

type RequestOptions = {
	signal?: AbortSignal;
};

function buildAdminOrderSearchParams(params: AdminOrderListParams) {
	const searchParams = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (
			value === undefined ||
			value === "" ||
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

export const adminOrderService = {
	async getOrders(
		params: AdminOrderListParams,
		options?: RequestOptions,
	): Promise<AdminOrderListResponse> {
		const response = await apiClient.get<AdminOrderListResponse>(
			"/admin/orders",
			{
				params: buildAdminOrderSearchParams(params),
				signal: options?.signal,
			},
		);

		return response.data;
	},

	async getOrderByNumber(
		orderNumber: string,
		options?: RequestOptions,
	): Promise<AdminOrderDetailResponse> {
		const response = await apiClient.get<AdminOrderDetailResponse>(
			`/admin/orders/${encodeURIComponent(orderNumber)}`,
			{ signal: options?.signal },
		);

		return response.data;
	},

	async updateOrderStatus(
		orderNumber: string,
		input: AdminOrderStatusUpdateInput,
	): Promise<AdminOrderDetailResponse> {
		const response = await apiClient.patch<AdminOrderDetailResponse>(
			`/admin/orders/${encodeURIComponent(orderNumber)}/status`,
			input,
		);

		return response.data;
	},

	async updatePaymentStatus(
		orderNumber: string,
		input: AdminPaymentStatusUpdateInput,
	): Promise<AdminOrderDetailResponse> {
		const response = await apiClient.patch<AdminOrderDetailResponse>(
			`/admin/orders/${encodeURIComponent(orderNumber)}/payment-status`,
			input,
		);

		return response.data;
	},
};
