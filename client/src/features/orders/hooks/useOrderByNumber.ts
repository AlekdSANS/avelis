import { useQuery } from "@tanstack/react-query";

import { ApiClientError } from "../../../services/apiClient";
import { orderService } from "../../../services/orderService";
import type { Order } from "../../../types/order";
import {
  isValidOrderNumber,
  orderKeys,
  retryTransientOrderError,
} from "../orderQueries";

type UseOrderByNumberOptions = {
  enabled?: boolean;
  guestToken?: string;
};

export function useOrderByNumber(
  orderNumber: string | undefined,
  options: UseOrderByNumberOptions = {},
) {
  const normalizedOrderNumber = orderNumber?.trim() ?? "";
  const validOrderNumber = isValidOrderNumber(orderNumber);
  const query = useQuery<Order, ApiClientError>({
    queryKey: orderKeys.detail(normalizedOrderNumber),
    queryFn: ({ signal }) =>
      orderService.getOrderByNumber(
        normalizedOrderNumber,
        options.guestToken,
        signal,
      ),
    enabled: validOrderNumber && (options.enabled ?? true),
    retry: retryTransientOrderError,
    staleTime: 60_000,
  });

  return {
    ...query,
    validOrderNumber,
  };
}
