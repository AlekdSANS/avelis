import { apiClient } from "./apiClient";
import type {
  AddCartItemInput,
  ApiResponse,
  Cart,
} from "../types";

export interface UpdateCartItemInput {
  quantity: number;
}

export const cartService = {
  async getCart(): Promise<Cart> {
    const response = await apiClient.get<ApiResponse<Cart>>("/cart");

    return response.data.data;
  },

  async addItem(input: AddCartItemInput): Promise<Cart> {
    const response = await apiClient.post<ApiResponse<Cart>>(
      "/cart/items",
      input,
    );

    return response.data.data;
  },

  async updateItem(
    itemId: string,
    input: UpdateCartItemInput,
  ): Promise<Cart> {
    const response = await apiClient.patch<ApiResponse<Cart>>(
      `/cart/items/${itemId}`,
      input,
    );

    return response.data.data;
  },

  async removeItem(itemId: string): Promise<Cart> {
    const response = await apiClient.delete<ApiResponse<Cart>>(
      `/cart/items/${itemId}`,
    );

    return response.data.data;
  },
};
