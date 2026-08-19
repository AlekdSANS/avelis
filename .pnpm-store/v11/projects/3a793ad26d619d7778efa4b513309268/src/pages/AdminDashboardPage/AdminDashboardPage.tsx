import {
	AlertTriangle,
	ArrowRight,
	Package,
	PackageOpen,
	Plus,
	RefreshCcw,
	ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button/Button";
import { Price } from "../../components/ui/Price/Price";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	AdminStatCard,
	AdminStatCardSkeleton,
} from "../../features/admin/components/AdminStatCard";
import { useAdminDashboard } from "../../features/admin/hooks/useAdminDashboard";
import {
	formatOrderDate,
	formatOrderStatus,
	formatPaymentStatus,
} from "../../features/orders/utils/orderFormatters";
import { ApiClientError } from "../../services/apiClient";
import type { AdminRecentOrder } from "../../types/admin";
import styles from "./AdminDashboardPage.module.scss";

function AdminDashboardSkeleton() {
	return (
		<div
			aria-label="Loading dashboard overview"
			aria-live="polite"
			className={styles.loading}
			role="status"
		>
			<span className={styles.visuallyHidden}>Loading dashboard overview</span>
			<div className={styles.statGrid}>
				{Array.from({ length: 6 }, (_, index) => (
					<AdminStatCardSkeleton key={index} />
				))}
			</div>
			<div className={styles.loadingPanel}>
				<Skeleton className={styles.loadingTitle} />
				{Array.from({ length: 5 }, (_, index) => (
					<Skeleton className={styles.loadingRow} key={index} />
				))}
			</div>
		</div>
	);
}

function StatusLabel({
	children,
	tone = "neutral",
}: {
	children: string;
	tone?: "neutral" | "dark";
}) {
	return (
		<span
			className={[
				styles.statusLabel,
				tone === "dark" ? styles.statusLabelDark : "",
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</span>
	);
}

function RecentOrderDesktopRow({ order }: { order: AdminRecentOrder }) {
	return (
		<tr>
			<td>
				<Link
					className={styles.orderNumber}
					to={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
				>
					{order.orderNumber}
				</Link>
			</td>
			<td>{order.customerName}</td>
			<td>
				<time dateTime={order.createdAt}>
					{formatOrderDate(order.createdAt)}
				</time>
			</td>
			<td>
				<StatusLabel>{formatOrderStatus(order.status)}</StatusLabel>
			</td>
			<td>
				<StatusLabel tone="dark">
					{formatPaymentStatus(order.paymentStatus)}
				</StatusLabel>
			</td>
			<td className={styles.totalCell}>
				<Price currency={order.currency} value={order.total} />
			</td>
		</tr>
	);
}

function RecentOrderMobileCard({ order }: { order: AdminRecentOrder }) {
	return (
		<article className={styles.orderCard}>
			<div className={styles.orderCardHeading}>
				<div>
					<p>Order</p>
					<Link
						className={styles.orderNumber}
						to={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
					>
						{order.orderNumber}
					</Link>
				</div>
				<Price currency={order.currency} value={order.total} />
			</div>
			<dl>
				<div>
					<dt>Customer</dt>
					<dd>{order.customerName}</dd>
				</div>
				<div>
					<dt>Date</dt>
					<dd>
						<time dateTime={order.createdAt}>
							{formatOrderDate(order.createdAt)}
						</time>
					</dd>
				</div>
			</dl>
			<div className={styles.orderCardStatuses}>
				<StatusLabel>{formatOrderStatus(order.status)}</StatusLabel>
				<StatusLabel tone="dark">
					{formatPaymentStatus(order.paymentStatus)}
				</StatusLabel>
			</div>
		</article>
	);
}

function DashboardError({
	error,
	onRetry,
}: {
	error: Error;
	onRetry: () => void;
}) {
	const statusCode =
		error instanceof ApiClientError ? error.statusCode : undefined;
	const isUnauthorized = statusCode === 401;
	const isForbidden = statusCode === 403;

	return (
		<section className={styles.errorState} role="alert">
			<AlertTriangle aria-hidden="true" />
			<p className={styles.eyebrow}>
				{isForbidden ? "Permission changed" : "Dashboard unavailable"}
			</p>
			<h2>
				{isUnauthorized
					? "Your session has ended"
					: isForbidden
						? "Admin access required"
						: "We could not load the dashboard"}
			</h2>
			<p>
				{isUnauthorized
					? "Sign in again to continue to the admin workspace."
					: isForbidden
						? "Your account no longer has permission to view this area."
						: "Check your connection and try the request again."}
			</p>
			<div className={styles.errorActions}>
				{isUnauthorized ? (
					<Link className={styles.primaryLink} to="/login">
						Sign in
					</Link>
				) : isForbidden ? (
					<Link className={styles.primaryLink} to="/account">
						Return to account
					</Link>
				) : (
					<Button onClick={onRetry}>
						<RefreshCcw aria-hidden="true" />
						Try again
					</Button>
				)}
				<Link className={styles.secondaryLink} to="/">
					Return to store
				</Link>
			</div>
		</section>
	);
}

export function AdminDashboardPage() {
	const dashboardQuery = useAdminDashboard();
	const dashboard = dashboardQuery.data?.data;

	return (
		<section className={styles.page}>
			<header className={styles.intro}>
				<div>
					<p className={styles.eyebrow}>Store overview</p>
					<h2>Good to have you here.</h2>
					<p>
						A live operational view of AVELIS products, customers,
						orders, and sales.
					</p>
				</div>
				<div className={styles.quickActions} aria-label="Quick actions">
					<Link className={styles.primaryLink} to="/admin/products/new">
						<Plus aria-hidden="true" />
						Add product
					</Link>
					<Link className={styles.secondaryLink} to="/admin/orders">
						View orders
						<ArrowRight aria-hidden="true" />
					</Link>
				</div>
			</header>

			{dashboardQuery.isLoading ? <AdminDashboardSkeleton /> : null}

			{dashboardQuery.isError ? (
				<DashboardError
					error={dashboardQuery.error}
					onRetry={() => {
						void dashboardQuery.refetch();
					}}
				/>
			) : null}

			{dashboard === undefined ? null : (
				<div
					aria-busy={dashboardQuery.isFetching}
					aria-live="polite"
					className={styles.dashboard}
				>
					<section aria-labelledby="summary-heading">
						<div className={styles.sectionHeading}>
							<div>
								<p className={styles.eyebrow}>At a glance</p>
								<h2 id="summary-heading">Store summary</h2>
							</div>
							{dashboardQuery.isFetching ? (
								<span className={styles.refreshing}>Refreshing…</span>
							) : null}
						</div>
						<div className={styles.statGrid}>
							<AdminStatCard
								helper={`${dashboard.products.inactive} inactive`}
								label="Total products"
								value={dashboard.products.total}
							/>
							<AdminStatCard
								helper="Visible in the active catalogue"
								label="Active products"
								value={dashboard.products.active}
							/>
							<AdminStatCard
								helper="All order statuses"
								label="Total orders"
								value={dashboard.orders.total}
							/>
							<AdminStatCard
								helper="Registered customer accounts"
								label="Customers"
								value={dashboard.customers.total}
							/>
							<AdminStatCard
								helper="Placed EUR orders; cancelled and refunded excluded"
								label="Sales total"
								value={
									<Price
										currency={dashboard.revenue.currency}
										value={dashboard.revenue.total}
									/>
								}
							/>
							<AdminStatCard
								helper="Variants with 1–5 units remaining"
								label="Low stock variants"
								value={dashboard.products.lowStockVariants}
							/>
						</div>
					</section>

					<div className={styles.middleGrid}>
						<section
							aria-labelledby="status-heading"
							className={styles.panel}
						>
							<div className={styles.panelHeading}>
								<div>
									<p className={styles.eyebrow}>Fulfilment</p>
									<h2 id="status-heading">Order status</h2>
								</div>
								<ShoppingBag aria-hidden="true" />
							</div>
							<dl className={styles.statusOverview}>
								<div>
									<dt>Pending payment</dt>
									<dd>{dashboard.orders.pendingPayment}</dd>
								</div>
								<div>
									<dt>Processing</dt>
									<dd>{dashboard.orders.processing}</dd>
								</div>
								<div>
									<dt>Shipped</dt>
									<dd>{dashboard.orders.shipped}</dd>
								</div>
								<div>
									<dt>Delivered</dt>
									<dd>{dashboard.orders.delivered}</dd>
								</div>
							</dl>
							<Link className={styles.panelLink} to="/admin/orders">
								View order workspace
								<ArrowRight aria-hidden="true" />
							</Link>
						</section>

						<section
							aria-labelledby="actions-heading"
							className={styles.panel}
						>
							<div className={styles.panelHeading}>
								<div>
									<p className={styles.eyebrow}>Next steps</p>
									<h2 id="actions-heading">Quick actions</h2>
								</div>
								<Package aria-hidden="true" />
							</div>
							<div className={styles.actionList}>
								<Link to="/admin/products/new">
									<span>
										<strong>Add a product</strong>
										<small>Open the complete product editor</small>
									</span>
									<ArrowRight aria-hidden="true" />
								</Link>
								<Link to="/admin/products">
									<span>
										<strong>View products</strong>
										<small>Manage catalogue, stock, and visibility</small>
									</span>
									<ArrowRight aria-hidden="true" />
								</Link>
								<Link to="/admin/orders">
									<span>
										<strong>View orders</strong>
										<small>Review fulfilment and payment status</small>
									</span>
									<ArrowRight aria-hidden="true" />
								</Link>
							</div>
						</section>
					</div>

					<section
						aria-labelledby="recent-orders-heading"
						className={styles.recentOrders}
					>
						<div className={styles.sectionHeading}>
							<div>
								<p className={styles.eyebrow}>Latest activity</p>
								<h2 id="recent-orders-heading">Recent orders</h2>
							</div>
							<Link className={styles.sectionLink} to="/admin/orders">
								View all orders
								<ArrowRight aria-hidden="true" />
							</Link>
						</div>

						{dashboard.recentOrders.length === 0 ? (
							<div className={styles.emptyState}>
								<PackageOpen aria-hidden="true" />
								<h3>No orders yet</h3>
								<p>
									Newly placed orders will appear here as they arrive.
								</p>
							</div>
						) : (
							<>
								<div className={styles.tableWrap}>
									<table>
										<caption className={styles.visuallyHidden}>
											Seven most recent AVELIS orders
										</caption>
										<thead>
											<tr>
												<th scope="col">Order</th>
												<th scope="col">Customer</th>
												<th scope="col">Date</th>
												<th scope="col">Status</th>
												<th scope="col">Payment</th>
												<th scope="col">Total</th>
											</tr>
										</thead>
										<tbody>
											{dashboard.recentOrders.map((order) => (
												<RecentOrderDesktopRow
													key={order.orderNumber}
													order={order}
												/>
											))}
										</tbody>
									</table>
								</div>
								<div className={styles.mobileOrders}>
									{dashboard.recentOrders.map((order) => (
										<RecentOrderMobileCard
											key={order.orderNumber}
											order={order}
										/>
									))}
								</div>
							</>
						)}
					</section>
				</div>
			)}
		</section>
	);
}
