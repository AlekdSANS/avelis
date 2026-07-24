import type {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  ShippingMethod,
} from "../../../types/order";

const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING_PAYMENT: "Pending payment",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

export const ORDER_STATUS_VALUES: readonly OrderStatus[] = [
  "PENDING_PAYMENT",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
];

const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
};

const paymentMethodLabels: Record<PaymentMethod, string> = {
  CARD: "Card",
  BLIK: "BLIK",
  CASH_ON_DELIVERY: "Cash on delivery",
};

const shippingMethodLabels: Record<ShippingMethod, string> = {
  STANDARD: "Standard delivery",
  EXPRESS: "Express delivery",
};

export function formatOrderStatus(status: OrderStatus) {
  return orderStatusLabels[status];
}

export function formatPaymentStatus(status: PaymentStatus) {
  return paymentStatusLabels[status];
}

export function formatPaymentMethod(method: PaymentMethod) {
  return paymentMethodLabels[method];
}

export function formatShippingMethod(method: ShippingMethod) {
  return shippingMethodLabels[method];
}

export function formatOrderDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}
