import type { AxiosRequestConfig } from "axios";

import type {
  CreateOrderInput,
  CreateOrderResponse,
  Order,
} from "../types";
import { ApiClientError, apiClient } from "./apiClient";

const GUEST_ACCESS_HEADER = "X-Guest-Access-Token";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readString(record: Record<string, unknown>, key: string) {
  const value = record[key];

  if (typeof value !== "string" || value.length === 0) {
    throw new ApiClientError({
      message: "The order response was incomplete.",
    });
  }

  return value;
}

function readMoney(record: Record<string, unknown>, key: string) {
  const value = record[key];
  const amount = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(amount)) {
    throw new ApiClientError({
      message: "The order response contained an invalid total.",
    });
  }

  return amount;
}

function parseOrder(payload: unknown): Order {
  if (!isRecord(payload)) {
    throw new ApiClientError({ message: "The order response was invalid." });
  }

  const customer = payload.customer;
  const shippingAddress = payload.shippingAddress;
  const items = payload.items;

  if (
    !isRecord(customer) ||
    !isRecord(shippingAddress) ||
    !Array.isArray(items)
  ) {
    throw new ApiClientError({
      message: "The order response was incomplete.",
    });
  }

  return {
    id: readString(payload, "id"),
    orderNumber: readString(payload, "orderNumber"),
    status: readString(payload, "status") as Order["status"],
    paymentStatus: readString(
      payload,
      "paymentStatus",
    ) as Order["paymentStatus"],
    paymentMethod: readString(
      payload,
      "paymentMethod",
    ) as Order["paymentMethod"],
    shippingMethod: readString(
      payload,
      "shippingMethod",
    ) as Order["shippingMethod"],
    customer: {
      firstName: readString(customer, "firstName"),
      lastName: readString(customer, "lastName"),
      email: readString(customer, "email"),
      phone: readString(customer, "phone"),
    },
    shippingAddress: {
      country: readString(shippingAddress, "country"),
      city: readString(shippingAddress, "city"),
      postalCode: readString(shippingAddress, "postalCode"),
      street: readString(shippingAddress, "street"),
      building: readString(shippingAddress, "building"),
      apartment:
        typeof shippingAddress.apartment === "string"
          ? shippingAddress.apartment
          : null,
      deliveryNotes:
        typeof shippingAddress.deliveryNotes === "string"
          ? shippingAddress.deliveryNotes
          : null,
    },
    items: items.map((item) => {
      if (!isRecord(item)) {
        throw new ApiClientError({
          message: "The order response contained an invalid item.",
        });
      }

      return {
        id: readString(item, "id"),
        productId:
          typeof item.productId === "string" ? item.productId : null,
        variantId:
          typeof item.variantId === "string" ? item.variantId : null,
        productName: readString(item, "productName"),
        productSlug: readString(item, "productSlug"),
        sku: readString(item, "sku"),
        format: readString(item, "format") as Order["items"][number]["format"],
        volumeMl: readMoney(item, "volumeMl"),
        unitPrice: readMoney(item, "unitPrice"),
        quantity: readMoney(item, "quantity"),
        lineTotal: readMoney(item, "lineTotal"),
        imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : null,
      };
    }),
    subtotal: readMoney(payload, "subtotal"),
    shippingTotal: readMoney(payload, "shippingTotal"),
    discountTotal: readMoney(payload, "discountTotal"),
    total: readMoney(payload, "total"),
    currency: readString(payload, "currency"),
    confirmedAt:
      typeof payload.confirmedAt === "string" ? payload.confirmedAt : null,
    cancelledAt:
      typeof payload.cancelledAt === "string" ? payload.cancelledAt : null,
    createdAt: readString(payload, "createdAt"),
    updatedAt: readString(payload, "updatedAt"),
  };
}

function parseOrderResponse(payload: unknown): CreateOrderResponse {
  if (!isRecord(payload) || !("data" in payload)) {
    throw new ApiClientError({ message: "The order response was invalid." });
  }

  return {
    data: parseOrder(payload.data),
    ...(typeof payload.message === "string"
      ? { message: payload.message }
      : {}),
  };
}

export const orderService = {
  async createOrder(
    input: CreateOrderInput,
    signal?: AbortSignal,
  ): Promise<CreateOrderResponse> {
    const response = await apiClient.post<unknown>("/orders", input, {
      signal,
    });

    return parseOrderResponse(response.data);
  },

  async getOrderByNumber(
    orderNumber: string,
    guestToken?: string,
    signal?: AbortSignal,
  ): Promise<Order> {
    const config: AxiosRequestConfig = {
      signal,
      ...(guestToken === undefined
        ? {}
        : { headers: { [GUEST_ACCESS_HEADER]: guestToken } }),
    };
    const response = await apiClient.get<unknown>(
      `/orders/${encodeURIComponent(orderNumber)}`,
      config,
    );

    return parseOrderResponse(response.data).data;
  },
};
