import type { ApiResponse } from "./api";
import type { PaginatedResponse } from "./api";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "CANCELLED";

export type PaymentMethod = "CARD" | "BLIK" | "CASH_ON_DELIVERY";
export type ShippingMethod = "STANDARD" | "EXPRESS";
export type OrderItemFormat = "BOTTLE" | "REFILL";

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface OrderShippingAddress {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  building: string;
  apartment: string | null;
  deliveryNotes: string | null;
}

export interface CreateOrderItemInput {
  variantId: string;
  quantity: number;
}

export interface CreateOrderInput {
  customer: OrderCustomer;
  shippingAddress: Omit<
    OrderShippingAddress,
    "apartment" | "deliveryNotes"
  > & {
    apartment?: string;
    deliveryNotes?: string;
  };
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  items: CreateOrderItemInput[];
  idempotencyKey: string;
}

export interface OrderItem {
  id: string;
  productId: string | null;
  variantId: string | null;
  productName: string;
  productSlug: string;
  sku: string;
  format: OrderItemFormat;
  volumeMl: number;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  imageUrl: string | null;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  customer: OrderCustomer;
  shippingAddress: OrderShippingAddress;
  items: OrderItem[];
  subtotal: number;
  shippingTotal: number;
  discountTotal: number;
  total: number;
  currency: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CreateOrderResponse = ApiResponse<Order>;

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  itemCount: number;
  total: number;
  currency: string;
  firstItemImageUrl: string | null;
  itemPreviews: Array<{
    id: string;
    productName: string;
    imageUrl: string | null;
    quantity: number;
  }>;
  createdAt: string;
}

export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: OrderStatus;
}

export type OrderListResponse = PaginatedResponse<OrderSummary>;

export interface OrderStockConflictItem {
  variantId: string;
  availableStock?: number;
}

export interface OrderApiError {
  message: string;
  statusCode?: number;
  code?: string;
  issues?: { message: string; path: string }[];
  items?: OrderStockConflictItem[];
}
