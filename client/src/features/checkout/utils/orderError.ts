import { ApiClientError } from "../../../services/apiClient";
import type { OrderStockConflictItem } from "../../../types/order";

export type CheckoutOrderError = {
  message: string;
  stockItems: OrderStockConflictItem[];
};

function includesText(error: ApiClientError, text: string) {
  return error.message.toLowerCase().includes(text);
}

export function mapCreateOrderError(error: unknown): CheckoutOrderError {
  if (!(error instanceof ApiClientError)) {
    return {
      message: "We could not place your order. Please try again.",
      stockItems: [],
    };
  }

  if (error.statusCode === undefined) {
    return {
      message: "We could not reach the server. Your cart has not been cleared.",
      stockItems: [],
    };
  }

  if (error.statusCode === 400) {
    return {
      message: "Please review your checkout details.",
      stockItems: [],
    };
  }

  if (error.statusCode === 401) {
    return {
      message:
        "We could not verify your session. Please sign in again or continue as a guest.",
      stockItems: [],
    };
  }

  if (error.statusCode === 404) {
    return {
      message: "One or more items are no longer available.",
      stockItems: [],
    };
  }

  if (
    error.statusCode === 409 &&
    (error.code === "INSUFFICIENT_STOCK" ||
      includesText(error, "insufficient stock"))
  ) {
    return {
      message:
        "Some items are no longer available in the requested quantity.",
      stockItems: error.items ?? [],
    };
  }

  if (
    error.statusCode === 409 &&
    (error.code === "IDEMPOTENCY_CONFLICT" ||
      includesText(error, "idempotency") ||
      includesText(error, "already exists"))
  ) {
    return {
      message: "This order has already been submitted.",
      stockItems: [],
    };
  }

  if (error.statusCode === 409) {
    return {
      message: "One or more items are no longer available.",
      stockItems: error.items ?? [],
    };
  }

  return {
    message: "We could not place your order. Please try again.",
    stockItems: [],
  };
}
