import type { ApiClientError } from "../../services/apiClient";
import type { OrderListParams } from "../../types/order";

const ORDER_NUMBER_PATTERN =
  /^AVELIS-\d{8}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export const orderKeys = {
  all: ["orders"] as const,
  detail: (orderNumber: string) => ["orders", orderNumber] as const,
  list: (params: Required<Pick<OrderListParams, "page" | "limit">> &
    Pick<OrderListParams, "status">) => ["orders", params] as const,
};

export function isValidOrderNumber(orderNumber: string | undefined) {
  return (
    orderNumber !== undefined && ORDER_NUMBER_PATTERN.test(orderNumber.trim())
  );
}

export function retryTransientOrderError(
  failureCount: number,
  error: ApiClientError,
) {
  if (error.statusCode === 401 || error.statusCode === 404) {
    return false;
  }

  return (
    failureCount < 1 &&
    (error.statusCode === undefined || error.statusCode >= 500)
  );
}
