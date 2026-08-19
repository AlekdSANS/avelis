import { Badge } from "../../../components/ui/Badge/Badge";
import type { OrderStatus, PaymentStatus } from "../../../types/order";
import {
  formatOrderStatus,
  formatPaymentStatus,
} from "../utils/orderFormatters";
import styles from "./OrderStatusBadges.module.scss";

type OrderStatusBadgesProps = {
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
};

export function OrderStatusBadges({
  orderStatus,
  paymentStatus,
}: OrderStatusBadgesProps) {
  return (
    <div className={styles.badges}>
      <Badge aria-label={`Order status: ${formatOrderStatus(orderStatus)}`}>
        Order · {formatOrderStatus(orderStatus)}
      </Badge>
      <Badge
        aria-label={`Payment status: ${formatPaymentStatus(paymentStatus)}`}
        tone="dark"
      >
        Payment · {formatPaymentStatus(paymentStatus)}
      </Badge>
    </div>
  );
}
