import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { orderService } from "../../../services/orderService";
import type {
  OrderListParams,
  OrderListResponse,
} from "../../../types/order";
import {
  orderKeys,
  retryTransientOrderError,
} from "../orderQueries";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function normalizePositiveInteger(value: number | undefined, fallback: number) {
  return value !== undefined && Number.isInteger(value) && value > 0
    ? value
    : fallback;
}

export function normalizeOrderListParams(
  params: OrderListParams,
): Required<Pick<OrderListParams, "page" | "limit">> &
  Pick<OrderListParams, "status"> {
  return {
    page: normalizePositiveInteger(params.page, DEFAULT_PAGE),
    limit: normalizePositiveInteger(params.limit, DEFAULT_LIMIT),
    ...(params.status === undefined ? {} : { status: params.status }),
  };
}

export function useOrders(params: OrderListParams) {
  const normalizedParams = normalizeOrderListParams(params);

  return useQuery<OrderListResponse, ApiClientError>({
    queryKey: orderKeys.list(normalizedParams),
    queryFn: ({ signal }) =>
      orderService.getOrders(normalizedParams, signal),
    placeholderData: keepPreviousData,
    retry: retryTransientOrderError,
    staleTime: 30_000,
  });
}
