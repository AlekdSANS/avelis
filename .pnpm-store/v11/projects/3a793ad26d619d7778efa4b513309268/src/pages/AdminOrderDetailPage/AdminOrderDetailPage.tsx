import {
	AlertTriangle,
	ArrowLeft,
	Clock3,
	RefreshCcw,
	ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Modal } from "../../components/ui/Modal/Modal";
import { Price } from "../../components/ui/Price/Price";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	AdminOrderStatusBadge,
	AdminPaymentStatusBadge,
} from "../../features/admin/components/AdminOrderBadges";
import {
	useAdminOrder,
	useUpdateAdminOrderStatus,
	useUpdateAdminPaymentStatus,
} from "../../features/admin/hooks/useAdminOrders";
import {
	formatOrderDate,
	formatOrderStatus,
	formatPaymentMethod,
	formatPaymentStatus,
	formatShippingMethod,
} from "../../features/orders/utils/orderFormatters";
import { ProductImage } from "../../features/products/components/ProductImage";
import { ApiClientError } from "../../services/apiClient";
import type { AdminOrderDetail } from "../../types/adminOrder";
import type { OrderStatus, PaymentStatus } from "../../types/order";
import styles from "./AdminOrderDetailPage.module.scss";

type PendingTransition =
	| { kind: "order"; status: OrderStatus }
	| { kind: "payment"; status: PaymentStatus };

function DetailSkeleton() {
	return (
		<section
			aria-label="Loading admin order details"
			aria-live="polite"
			className={styles.page}
			role="status"
		>
			<Skeleton className={styles.skeletonHeading} />
			<div className={styles.layout}>
				<Skeleton className={styles.skeletonMain} />
				<Skeleton className={styles.skeletonAside} />
			</div>
		</section>
	);
}

function DetailError({
	isMissing,
	onRetry,
}: {
	isMissing: boolean;
	onRetry: () => void;
}) {
	return (
		<section className={styles.errorState} role="alert">
			<AlertTriangle aria-hidden="true" />
			<p className={styles.eyebrow}>Order workspace</p>
			<h2>{isMissing ? "Order not found" : "Order details unavailable"}</h2>
			<p>
				{isMissing
					? "This order number does not match an order in the admin workspace."
					: "Check your connection and try loading the order again."}
			</p>
			<div>
				{isMissing ? null : (
					<Button onClick={onRetry}>
						<RefreshCcw aria-hidden="true" />
						Try again
					</Button>
				)}
				<ButtonLink to="/admin/orders" variant="secondary">
					Back to orders
				</ButtonLink>
			</div>
		</section>
	);
}

function OrderItems({ order }: { order: AdminOrderDetail }) {
	return (
		<section aria-labelledby="admin-order-items" className={styles.panel}>
			<div className={styles.sectionHeading}>
				<div>
					<p className={styles.eyebrow}>Historical snapshot</p>
					<h2 id="admin-order-items">Order items</h2>
				</div>
				<span>
					{order.items.length} {order.items.length === 1 ? "item" : "items"}
				</span>
			</div>
			<ul className={styles.items}>
				{order.items.map((item, index) => (
					<li className={styles.item} key={`${item.sku}-${index}`}>
						<ProductImage
							alt={`${item.productName} ${item.format === "BOTTLE" ? "bottle" : "refill"}`}
							className={styles.itemImage}
							src={
								item.imageUrl ??
								"/images/placeholders/product_placeholder.png"
							}
						/>
						<div className={styles.itemCopy}>
							<h3>{item.productName}</h3>
							<p>
								{item.format === "BOTTLE" ? "Bottle" : "Refill"} ·{" "}
								{item.volumeMl} ml
							</p>
							<p>SKU {item.sku}</p>
							<p>Quantity {item.quantity}</p>
						</div>
						<div className={styles.itemPrice}>
							<span>
								<Price
									currency={order.currency}
									value={item.unitPrice}
								/>{" "}
								each
							</span>
							<strong>
								<Price
									currency={order.currency}
									value={item.lineTotal}
								/>
							</strong>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}

function CustomerAndShipping({ order }: { order: AdminOrderDetail }) {
	const address = order.shippingAddress;

	return (
		<div className={styles.informationGrid}>
			<section aria-labelledby="admin-order-customer" className={styles.panel}>
				<p className={styles.eyebrow}>Customer snapshot</p>
				<h2 id="admin-order-customer">Customer</h2>
				<dl className={styles.meta}>
					<div>
						<dt>Name</dt>
						<dd>
							{order.customer.firstName} {order.customer.lastName}
						</dd>
					</div>
					<div>
						<dt>Email</dt>
						<dd>
							<a href={`mailto:${order.customer.email}`}>
								{order.customer.email}
							</a>
						</dd>
					</div>
					<div>
						<dt>Phone</dt>
						<dd>
							<a href={`tel:${order.customer.phone}`}>
								{order.customer.phone}
							</a>
						</dd>
					</div>
					<div>
						<dt>Linked account</dt>
						<dd>
							{order.linkedAccount === null
								? "Guest checkout"
								: order.linkedAccount.email}
						</dd>
					</div>
				</dl>
			</section>

			<section aria-labelledby="admin-order-shipping" className={styles.panel}>
				<p className={styles.eyebrow}>Delivery snapshot</p>
				<h2 id="admin-order-shipping">Shipping</h2>
				<address className={styles.address}>
					<span>
						{address.street} {address.building}
						{address.apartment ? `/${address.apartment}` : ""}
					</span>
					<span>
						{address.postalCode} {address.city}
					</span>
					<span>{address.country === "PL" ? "Poland" : address.country}</span>
				</address>
				<dl className={styles.meta}>
					<div>
						<dt>Method</dt>
						<dd>{formatShippingMethod(order.shippingMethod)}</dd>
					</div>
					<div>
						<dt>Delivery notes</dt>
						<dd>{order.deliveryNotes ?? "No delivery notes"}</dd>
					</div>
				</dl>
			</section>
		</div>
	);
}

function OrderActivity({ order }: { order: AdminOrderDetail }) {
	const events = [
		{ label: "Order placed", value: order.createdAt },
		order.confirmedAt === null
			? null
			: { label: "Order confirmed", value: order.confirmedAt },
		order.cancelledAt === null
			? null
			: { label: "Order cancelled", value: order.cancelledAt },
		{ label: "Last updated", value: order.updatedAt },
	].filter((event): event is { label: string; value: string } => event !== null);

	return (
		<section aria-labelledby="admin-order-activity" className={styles.panel}>
			<div className={styles.sectionHeading}>
				<div>
					<p className={styles.eyebrow}>Recorded timestamps</p>
					<h2 id="admin-order-activity">Activity</h2>
				</div>
				<Clock3 aria-hidden="true" />
			</div>
			<ol className={styles.timeline}>
				{events.map((event) => (
					<li key={`${event.label}-${event.value}`}>
						<span aria-hidden="true" />
						<div>
							<strong>{event.label}</strong>
							<time dateTime={event.value}>
								{formatOrderDate(event.value)}
							</time>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}

function OrderSummary({ order }: { order: AdminOrderDetail }) {
	return (
		<section aria-labelledby="admin-order-total" className={styles.summary}>
			<p className={styles.eyebrow}>Recorded totals</p>
			<h2 id="admin-order-total">Order summary</h2>
			<dl className={styles.totals}>
				<div>
					<dt>Subtotal</dt>
					<dd>
						<Price currency={order.currency} value={order.subtotal} />
					</dd>
				</div>
				<div>
					<dt>Shipping</dt>
					<dd>
						<Price
							currency={order.currency}
							value={order.shippingTotal}
						/>
					</dd>
				</div>
				<div>
					<dt>Discount</dt>
					<dd>
						{order.discountTotal > 0 ? "−" : null}
						<Price
							currency={order.currency}
							value={order.discountTotal}
						/>
					</dd>
				</div>
				<div className={styles.grandTotal}>
					<dt>Total</dt>
					<dd>
						<Price currency={order.currency} value={order.total} />
					</dd>
				</div>
			</dl>
			<p>These values are the immutable pricing snapshot from checkout.</p>
		</section>
	);
}

function transitionLabel(transition: PendingTransition) {
	return transition.kind === "order"
		? formatOrderStatus(transition.status)
		: formatPaymentStatus(transition.status);
}

function isDestructiveTransition(transition: PendingTransition) {
	return ["CANCELLED", "REFUNDED"].includes(transition.status);
}

function AdminActions({
	order,
	onSelect,
}: {
	order: AdminOrderDetail;
	onSelect: (transition: PendingTransition) => void;
}) {
	const hasOrderTransitions = order.allowedTransitions.orderStatus.length > 0;
	const hasPaymentTransitions =
		order.allowedTransitions.paymentStatus.length > 0;

	return (
		<section aria-labelledby="admin-order-actions" className={styles.actionsPanel}>
			<div className={styles.actionsHeading}>
				<ShieldCheck aria-hidden="true" />
				<div>
					<p className={styles.eyebrow}>Manual controls</p>
					<h2 id="admin-order-actions">Admin actions</h2>
				</div>
			</div>
			<div className={styles.currentStates}>
				<div>
					<span>Order</span>
					<AdminOrderStatusBadge status={order.status} />
				</div>
				<div>
					<span>Payment</span>
					<AdminPaymentStatusBadge status={order.paymentStatus} />
				</div>
			</div>
			<div className={styles.actionGroup}>
				<h3>Next order status</h3>
				{hasOrderTransitions ? (
					<div>
						{order.allowedTransitions.orderStatus.map((status) => (
							<Button
								key={status}
								onClick={() => onSelect({ kind: "order", status })}
								size="sm"
								variant={
									["CANCELLED", "REFUNDED"].includes(status)
										? "secondary"
										: "primary"
								}
							>
								{formatOrderStatus(status)}
							</Button>
						))}
					</div>
				) : (
					<p>No further order transitions are available.</p>
				)}
			</div>
			<div className={styles.actionGroup}>
				<h3>Next payment status</h3>
				{hasPaymentTransitions ? (
					<div>
						{order.allowedTransitions.paymentStatus.map((status) => (
							<Button
								key={status}
								onClick={() => onSelect({ kind: "payment", status })}
								size="sm"
								variant={
									["CANCELLED", "REFUNDED", "FAILED"].includes(status)
										? "secondary"
										: "primary"
								}
							>
								{formatPaymentStatus(status)}
							</Button>
						))}
					</div>
				) : (
					<p>No further payment transitions are available.</p>
				)}
			</div>
			<div className={styles.manualNotice}>
				<strong>Manual status only</strong>
				<p>
					These controls do not charge, refund, ship, email, or restore
					inventory. Complete any real-world operation separately.
				</p>
			</div>
		</section>
	);
}

function AdminOrderWorkspace({ order }: { order: AdminOrderDetail }) {
	const headingRef = useRef<HTMLHeadingElement>(null);
	const [pendingTransition, setPendingTransition] =
		useState<PendingTransition | null>(null);
	const [feedback, setFeedback] = useState<{
		kind: "error" | "success";
		text: string;
	} | null>(null);
	const orderMutation = useUpdateAdminOrderStatus();
	const paymentMutation = useUpdateAdminPaymentStatus();
	const isPending = orderMutation.isPending || paymentMutation.isPending;

	useEffect(() => {
		headingRef.current?.focus();
	}, []);

	const confirmTransition = async () => {
		if (pendingTransition === null) return;

		setFeedback(null);

		try {
			const response =
				pendingTransition.kind === "order"
					? await orderMutation.mutateAsync({
							orderNumber: order.orderNumber,
							input: { status: pendingTransition.status },
						})
					: await paymentMutation.mutateAsync({
							orderNumber: order.orderNumber,
							input: { paymentStatus: pendingTransition.status },
						});

			setPendingTransition(null);
			setFeedback({
				kind: "success",
				text: response.message ?? "Order state updated.",
			});
		} catch (error) {
			setFeedback({
				kind: "error",
				text:
					error instanceof ApiClientError
						? error.message
						: "The order could not be updated. Please try again.",
			});
		}
	};

	return (
		<section className={styles.page}>
			<Link className={styles.backLink} to="/admin/orders">
				<ArrowLeft aria-hidden="true" />
				Back to orders
			</Link>

			<header className={styles.heading}>
				<div>
					<p className={styles.eyebrow}>Order detail</p>
					<h2 ref={headingRef} tabIndex={-1}>
						{order.orderNumber}
					</h2>
					<p>
						Placed{" "}
						<time dateTime={order.createdAt}>
							{formatOrderDate(order.createdAt)}
						</time>
					</p>
				</div>
				<div className={styles.headingBadges}>
					<AdminOrderStatusBadge status={order.status} />
					<AdminPaymentStatusBadge status={order.paymentStatus} />
				</div>
			</header>

			{feedback === null ? null : (
				<div
					className={[
						styles.feedback,
						feedback.kind === "error" ? styles.feedbackError : "",
					]
						.filter(Boolean)
						.join(" ")}
					role={feedback.kind === "error" ? "alert" : "status"}
				>
					{feedback.text}
				</div>
			)}

			<div className={styles.layout}>
				<div className={styles.mainColumn}>
					<OrderItems order={order} />
					<CustomerAndShipping order={order} />
					<OrderActivity order={order} />
				</div>
				<aside className={styles.aside}>
					<OrderSummary order={order} />
					<section
						aria-labelledby="admin-order-methods"
						className={styles.methods}
					>
						<p className={styles.eyebrow}>Methods</p>
						<h2 id="admin-order-methods">Payment & delivery</h2>
						<dl>
							<div>
								<dt>Payment</dt>
								<dd>{formatPaymentMethod(order.paymentMethod)}</dd>
							</div>
							<div>
								<dt>Shipping</dt>
								<dd>{formatShippingMethod(order.shippingMethod)}</dd>
							</div>
						</dl>
					</section>
					<AdminActions
						onSelect={(transition) => {
							setFeedback(null);
							setPendingTransition(transition);
						}}
						order={order}
					/>
				</aside>
			</div>

			<Modal
				description="This changes the database state immediately after confirmation."
				footer={
					<>
						<Button
							disabled={isPending}
							onClick={() => setPendingTransition(null)}
							variant="secondary"
						>
							Keep current status
						</Button>
						<Button
							className={
								pendingTransition !== null &&
								isDestructiveTransition(pendingTransition)
									? styles.destructiveButton
									: undefined
							}
							disabled={isPending}
							onClick={() => void confirmTransition()}
						>
							{isPending ? "Updating…" : "Confirm update"}
						</Button>
					</>
				}
				isOpen={pendingTransition !== null}
				onClose={() => {
					if (!isPending) setPendingTransition(null);
				}}
				title={
					pendingTransition === null
						? "Update order"
						: `Change ${pendingTransition.kind} status to ${transitionLabel(pendingTransition)}?`
				}
			>
				<p>
					{pendingTransition?.kind === "order"
						? "This updates the fulfilment state recorded for the order."
						: "This records a manual payment state only; no payment provider action will run."}
				</p>
				{pendingTransition?.status === "CANCELLED" ? (
					<p className={styles.modalWarning}>
						Cancelling does not automatically return item quantities to stock.
					</p>
				) : null}
				{pendingTransition?.status === "REFUNDED" ? (
					<p className={styles.modalWarning}>
						This does not issue money to the customer. Complete any real refund
						separately.
					</p>
				) : null}
				{feedback?.kind === "error" ? (
					<p className={styles.modalError} role="alert">
						{feedback.text}
					</p>
				) : null}
			</Modal>
		</section>
	);
}

export function AdminOrderDetailPage() {
	const { orderNumber } = useParams<{ orderNumber: string }>();
	const orderQuery = useAdminOrder(orderNumber);
	const order = orderQuery.data?.data;

	useEffect(() => {
		const previousTitle = document.title;
		document.title =
			order === undefined
				? "Admin order | AVELIS"
				: `${order.orderNumber} | AVELIS Admin`;

		return () => {
			document.title = previousTitle;
		};
	}, [order]);

	if (orderQuery.isLoading) return <DetailSkeleton />;

	if (orderQuery.isError && order === undefined) {
		return (
			<DetailError
				isMissing={
					orderQuery.error instanceof ApiClientError &&
					orderQuery.error.statusCode === 404
				}
				onRetry={() => void orderQuery.refetch()}
			/>
		);
	}

	if (order === undefined) {
		return (
			<DetailError
				isMissing
				onRetry={() => void orderQuery.refetch()}
			/>
		);
	}

	return <AdminOrderWorkspace order={order} />;
}
