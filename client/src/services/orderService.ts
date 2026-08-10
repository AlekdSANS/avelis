import type { AxiosRequestConfig } from "axios";

import type {
  CreateOrderInput,
  CreateOrderResponse,
  Order,
  OrderItemFormat,
  OrderListParams,
  OrderListResponse,
  OrderSummary,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from "../types";
import { ApiClientError, apiClient } from "./apiClient";

const GUEST_ACCESS_HEADER = "X-Guest-Access-Token";
const ORDER_STATUSES: readonly OrderStatus[] = [
  "PENDING_PAYMENT",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];
const PAYMENT_STATUSES: readonly PaymentStatus[] = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "CANCELLED",
];
const PAYMENT_METHODS: readonly PaymentMethod[] = [
  "CARD",
  "BLIK",
  "CASH_ON_DELIVERY",
];
const SHIPPING_METHODS: readonly ShippingMethod[] = ["STANDARD", "EXPRESS"];
const ITEM_FORMATS: readonly OrderItemFormat[] = ["BOTTLE", "REFILL"];

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
  if (
    (typeof value !== "number" && typeof value !== "string") ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    throw new ApiClientError({
      message: "The order response contained an invalid total.",
    });
  }

  const amount = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(amount)) {
    throw new ApiClientError({
      message: "The order response contained an invalid total.",
    });
  }

  return amount;
}

function readPositiveInteger(record: Record<string, unknown>, key: string) {
  const value = readMoney(record, key);

  if (!Number.isInteger(value) || value < 1) {
    throw new ApiClientError({
      message: "The order response contained an invalid item quantity.",
    });
  }

  return value;
}

function readNonNegativeInteger(
  record: Record<string, unknown>,
  key: string,
) {
  const value = readMoney(record, key);

  if (!Number.isInteger(value) || value < 0) {
    throw new ApiClientError({
      message: "The order response contained invalid pagination data.",
    });
  }

  return value;
}

function readEnum<T extends string>(
  record: Record<string, unknown>,
  key: string,
  allowedValues: readonly T[],
) {
  const value = readString(record, key);

  if (!allowedValues.includes(value as T)) {
    throw new ApiClientError({
      message: "The order response contained an unsupported status.",
    });
  }

  return value as T;
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
    !Array.isArray(items) ||
    items.length === 0
  ) {
    throw new ApiClientError({
      message: "The order response was incomplete.",
    });
  }

  return {
    id: readString(payload, "id"),
    orderNumber: readString(payload, "orderNumber"),
    status: readEnum(payload, "status", ORDER_STATUSES),
    paymentStatus: readEnum(
      payload,
      "paymentStatus",
      PAYMENT_STATUSES,
    ),
    paymentMethod: readEnum(
      payload,
      "paymentMethod",
      PAYMENT_METHODS,
    ),
    shippingMethod: readEnum(
      payload,
      "shippingMethod",
      SHIPPING_METHODS,
    ),
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
        format: readEnum(item, "format", ITEM_FORMATS),
        volumeMl: readPositiveInteger(item, "volumeMl"),
        unitPrice: readMoney(item, "unitPrice"),
        quantity: readPositiveInteger(item, "quantity"),
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

function parseOrderSummary(payload: unknown): OrderSummary {
  if (!isRecord(payload)) {
    throw new ApiClientError({
      message: "The order history response was invalid.",
    });
  }

  const itemPreviews = Array.isArray(payload.itemPreviews)
    ? payload.itemPreviews.map((item) => {
        if (!isRecord(item)) {
          throw new ApiClientError({
            message: "The order history response contained an invalid item preview.",
          });
        }

        return {
          id: readString(item, "id"),
          productName: readString(item, "productName"),
          imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : null,
          quantity: readPositiveInteger(item, "quantity"),
        };
      })
    : [];

  return {
    id: readString(payload, "id"),
    orderNumber: readString(payload, "orderNumber"),
    status: readEnum(payload, "status", ORDER_STATUSES),
    paymentStatus: readEnum(
      payload,
      "paymentStatus",
      PAYMENT_STATUSES,
    ),
    itemCount: readNonNegativeInteger(payload, "itemCount"),
    total: readMoney(payload, "total"),
    currency: readString(payload, "currency"),
    firstItemImageUrl:
      typeof payload.firstItemImageUrl === "string"
        ? payload.firstItemImageUrl
        : null,
    itemPreviews,
    createdAt: readString(payload, "createdAt"),
  };
}

function parseOrderListResponse(payload: unknown): OrderListResponse {
  if (!isRecord(payload) || !Array.isArray(payload.data)) {
    throw new ApiClientError({
      message: "The order history response was invalid.",
    });
  }

  return {
    data: payload.data.map(parseOrderSummary),
    page: readPositiveInteger(payload, "page"),
    limit: readPositiveInteger(payload, "limit"),
    total: readNonNegativeInteger(payload, "total"),
    totalPages: readNonNegativeInteger(payload, "totalPages"),
  };
}

function createOrderListSearchParams(params: OrderListParams) {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined && params.page !== 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.limit !== undefined && params.limit !== 10) {
    searchParams.set("limit", String(params.limit));
  }

  if (params.status !== undefined) {
    searchParams.set("status", params.status);
  }

  return searchParams;
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

  async getOrders(
    params: OrderListParams = {},
    signal?: AbortSignal,
  ): Promise<OrderListResponse> {
    const response = await apiClient.get<unknown>("/orders", {
      params: createOrderListSearchParams(params),
      signal,
    });

    return parseOrderListResponse(response.data);
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
