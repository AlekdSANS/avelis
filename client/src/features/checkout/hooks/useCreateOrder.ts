import { useMutation } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

import { orderService } from "../../../services/orderService";
import type {
  CreateOrderInput,
  CreateOrderResponse,
} from "../../../types/order";
import type { ApiClientError } from "../../../services/apiClient";

export function useCreateOrder() {
  const activeSubmissionRef = useRef(false);
  const mutation = useMutation<
    CreateOrderResponse,
    ApiClientError,
    CreateOrderInput
  >({
    mutationFn: (input) => orderService.createOrder(input),
    retry: false,
  });
  const mutateOnceAsync = useCallback(
    async (input: CreateOrderInput) => {
      if (activeSubmissionRef.current) {
        return null;
      }

      activeSubmissionRef.current = true;

      try {
        return await mutation.mutateAsync(input);
      } finally {
        activeSubmissionRef.current = false;
      }
    },
    [mutation],
  );

  return {
    ...mutation,
    mutateOnceAsync,
  };
}
