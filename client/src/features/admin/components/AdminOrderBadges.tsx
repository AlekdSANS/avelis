import type { OrderStatus, PaymentStatus } from "../../../types/order";
import {
	formatOrderStatus,
	formatPaymentStatus,
} from "../../orders/utils/orderFormatters";
import styles from "./AdminOrderBadges.module.scss";

export function AdminOrderStatusBadge({
	status,
}: {
	status: OrderStatus;
}) {
	return (
		<span
			aria-label={`Order status: ${formatOrderStatus(status)}`}
			className={[styles.badge, styles[status.toLowerCase()]].join(" ")}
		>
			<span aria-hidden="true" />
			{formatOrderStatus(status)}
		</span>
	);
}

export function AdminPaymentStatusBadge({
	status,
}: {
	status: PaymentStatus;
}) {
	return (
		<span
			aria-label={`Payment status: ${formatPaymentStatus(status)}`}
			className={[
				styles.badge,
				styles.payment,
				styles[`payment-${status.toLowerCase()}`],
			].join(" ")}
		>
			<span aria-hidden="true" />
			{formatPaymentStatus(status)}
		</span>
	);
}
