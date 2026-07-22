import { apiClient } from "./apiClient";
import type {
  Address,
  ApiResponse,
  Order,
  PaginatedResponse,
} from "../types";

export interface CreateOrderInput {
  shippingAddress: Omit<Address, "id" | "isDefault">;
  deliveryMethod: string;
  paymentMethod: string;
}

export const orderService = {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const response = await apiClient.post<ApiResponse<Order>>(
      "/orders",
      input,
    );

    return response.data.data;
  },

  async getOrders(
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Order>> {
    const response = await apiClient.get<PaginatedResponse<Order>>(
      "/orders",
      {
        params: { page, limit },
      },
    );

    return response.data;
  },

  async getOrderById(orderId: string): Promise<Order> {
    const response = await apiClient.get<ApiResponse<Order>>(
      `/orders/${orderId}`,
    );

    return response.data.data;
  },
};
