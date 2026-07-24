import { useQuery } from "@tanstack/react-query";

import { useCurrentUser } from "../../auth/hooks/useAuth";
import { ApiClientError } from "../../../services/apiClient";
import { orderService } from "../../../services/orderService";
import type { Order } from "../../../types/order";

const ORDER_NUMBER_PATTERN =
  /^AVELIS-\d{8}-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export const orderKeys = {
  detail: (orderNumber: string) => ["orders", orderNumber] as const,
};

export function isValidOrderNumber(orderNumber: string | undefined) {
  return (
    orderNumber !== undefined && ORDER_NUMBER_PATTERN.test(orderNumber.trim())
  );
}

function retryTransientOrderError(
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

export function useOrderConfirmation(orderNumber: string | undefined) {
  const currentUser = useCurrentUser();
  const validOrderNumber = isValidOrderNumber(orderNumber);
  const normalizedOrderNumber = orderNumber?.trim() ?? "";
  const query = useQuery<Order, ApiClientError>({
    queryKey: orderKeys.detail(normalizedOrderNumber),
    queryFn: ({ signal }) =>
      orderService.getOrderByNumber(
        normalizedOrderNumber,
        undefined,
        signal,
      ),
    enabled:
      validOrderNumber &&
      !currentUser.isLoading &&
      !currentUser.isError &&
      currentUser.data !== null &&
      currentUser.data !== undefined,
    retry: retryTransientOrderError,
  });

  return {
    ...query,
    authError: currentUser.isError,
    authLoading: currentUser.isLoading,
    currentUser: currentUser.data,
    refetchAuth: currentUser.refetch,
    guestConfirmationUnavailable:
      validOrderNumber &&
      !currentUser.isLoading &&
      !currentUser.isError &&
      currentUser.data === null &&
      query.data === undefined,
    validOrderNumber,
  };
}
