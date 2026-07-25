import {
	ArrowRight,
	PackageOpen,
	RefreshCcw,
	Search,
	ShoppingBag,
	X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Price } from "../../components/ui/Price/Price";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import {
	AdminOrderStatusBadge,
	AdminPaymentStatusBadge,
} from "../../features/admin/components/AdminOrderBadges";
import { useAdminOrderFilters } from "../../features/admin/hooks/useAdminOrderFilters";
import { useAdminOrders } from "../../features/admin/hooks/useAdminOrders";
import {
	formatOrderShortDate,
	formatPaymentMethod,
	formatShippingMethod,
	ORDER_STATUS_VALUES,
	PAYMENT_METHOD_VALUES,
	PAYMENT_STATUS_VALUES,
	SHIPPING_METHOD_VALUES,
	formatOrderStatus,
	formatPaymentStatus,
} from "../../features/orders/utils/orderFormatters";
import { ProductImage } from "../../features/products/components/ProductImage";
import type {
	AdminOrderListItem,
	AdminOrderListParams,
} from "../../types/adminOrder";
import styles from "./AdminOrdersPage.module.scss";

const sortOptions = [
	{ value: "newest", label: "Newest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "total-asc", label: "Total: low to high" },
	{ value: "total-desc", label: "Total: high to low" },
] as const;

function AdminOrderSearch({
	onCommit,
	value,
}: {
	onCommit: (value: string) => void;
	value: string;
}) {
	const [draft, setDraft] = useState(value);

	useEffect(() => {
		if (draft.trim() === value) return;

		const timeoutId = window.setTimeout(() => {
			onCommit(draft.trim());
		}, 350);

		return () => window.clearTimeout(timeoutId);
	}, [draft, onCommit, value]);

	return (
		<div className={styles.search}>
			<Search aria-hidden="true" />
			<Input
				aria-label="Search orders by number, customer, email, or phone"
				autoComplete="off"
				onChange={(event) => setDraft(event.target.value)}
				placeholder="Search order, customer, email, or phone"
				type="search"
				value={draft}
			/>
			{draft.length > 0 ? (
				<button
					aria-label="Clear order search"
					onClick={() => {
						setDraft("");
						onCommit("");
					}}
					type="button"
				>
					<X aria-hidden="true" />
				</button>
			) : null}
		</div>
	);
}

function OrderIdentity({ order }: { order: AdminOrderListItem }) {
	return (
		<div className={styles.orderIdentity}>
			<ProductImage
				alt=""
				className={styles.orderImage}
				src={
					order.firstItemImageUrl ??
					"/images/placeholders/product_placeholder.png"
				}
			/>
			<div>
				<Link
					className={styles.orderNumber}
					to={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
				>
					{order.orderNumber}
				</Link>
			</div>
		</div>
	);
}

function CustomerIdentity({ order }: { order: AdminOrderListItem }) {
	return (
		<div className={styles.customer}>
			<strong>{order.customerName}</strong>
			<span>{order.customerEmail}</span>
		</div>
	);
}

function OrderTable({ orders }: { orders: AdminOrderListItem[] }) {
	return (
		<div className={styles.tableWrap}>
			<table>
				<caption className={styles.visuallyHidden}>
					AVELIS admin orders
				</caption>
				<thead>
					<tr>
						<th scope="col">Order</th>
						<th scope="col">Customer</th>
						<th scope="col">Date</th>
						<th scope="col">Order status</th>
						<th scope="col">Payment</th>
						<th scope="col">Delivery</th>
						<th scope="col">Items</th>
						<th scope="col">Total</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.orderNumber}>
							<td>
								<OrderIdentity order={order} />
							</td>
							<td>
								<CustomerIdentity order={order} />
							</td>
							<td>
								<time dateTime={order.createdAt}>
									{formatOrderShortDate(order.createdAt)}
								</time>
							</td>
							<td>
								<AdminOrderStatusBadge status={order.status} />
							</td>
							<td>
								<AdminPaymentStatusBadge
									status={order.paymentStatus}
								/>
							</td>
							<td>{formatShippingMethod(order.shippingMethod)}</td>
							<td>{order.itemCount}</td>
							<td className={styles.total}>
								<Price currency={order.currency} value={order.total} />
							</td>
							<td>
								<Link
									className={styles.viewLink}
									to={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
								>
									View
									<ArrowRight aria-hidden="true" />
								</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function OrderCards({ orders }: { orders: AdminOrderListItem[] }) {
	return (
		<div className={styles.cards}>
			{orders.map((order) => (
				<article className={styles.card} key={order.orderNumber}>
					<div className={styles.cardHeading}>
						<OrderIdentity order={order} />
						<Price currency={order.currency} value={order.total} />
					</div>
					<CustomerIdentity order={order} />
					<div className={styles.cardBadges}>
						<AdminOrderStatusBadge status={order.status} />
						<AdminPaymentStatusBadge status={order.paymentStatus} />
					</div>
					<dl>
						<div>
							<dt>Placed</dt>
							<dd>
								<time dateTime={order.createdAt}>
									{formatOrderShortDate(order.createdAt)}
								</time>
							</dd>
						</div>
						<div>
							<dt>Payment method</dt>
							<dd>{formatPaymentMethod(order.paymentMethod)}</dd>
						</div>
						<div>
							<dt>Shipping</dt>
							<dd>{formatShippingMethod(order.shippingMethod)}</dd>
						</div>
						<div>
							<dt>Items</dt>
							<dd>{order.itemCount}</dd>
						</div>
					</dl>
					<Link
						className={styles.viewLink}
						to={`/admin/orders/${encodeURIComponent(order.orderNumber)}`}
					>
						View order
						<ArrowRight aria-hidden="true" />
					</Link>
				</article>
			))}
		</div>
	);
}

function OrderListSkeleton() {
	return (
		<div
			aria-label="Loading orders"
			aria-live="polite"
			className={styles.skeleton}
			role="status"
		>
			<span className={styles.visuallyHidden}>Loading orders</span>
			{Array.from({ length: 7 }, (_, index) => (
				<div className={styles.skeletonRow} key={index}>
					<Skeleton className={styles.skeletonImage} />
					<div>
						<Skeleton />
						<Skeleton />
					</div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			))}
		</div>
	);
}

function getActiveFilters(filters: AdminOrderListParams) {
	const entries: Array<{
		key: keyof AdminOrderListParams;
		label: string;
	}> = [];

	if (filters.search) {
		entries.push({ key: "search", label: `"${filters.search}"` });
	}
	if (filters.status) {
		entries.push({
			key: "status",
			label: formatOrderStatus(filters.status),
		});
	}
	if (filters.paymentStatus) {
		entries.push({
			key: "paymentStatus",
			label: `Payment: ${formatPaymentStatus(filters.paymentStatus)}`,
		});
	}
	if (filters.paymentMethod) {
		entries.push({
			key: "paymentMethod",
			label: formatPaymentMethod(filters.paymentMethod),
		});
	}
	if (filters.shippingMethod) {
		entries.push({
			key: "shippingMethod",
			label: formatShippingMethod(filters.shippingMethod),
		});
	}
	if (filters.dateFrom) {
		entries.push({ key: "dateFrom", label: `From ${filters.dateFrom}` });
	}
	if (filters.dateTo) {
		entries.push({ key: "dateTo", label: `To ${filters.dateTo}` });
	}
	if (filters.minTotal !== undefined) {
		entries.push({
			key: "minTotal",
			label: `Min ${filters.minTotal} PLN`,
		});
	}
	if (filters.maxTotal !== undefined) {
		entries.push({
			key: "maxTotal",
			label: `Max ${filters.maxTotal} PLN`,
		});
	}

	return entries;
}

export function AdminOrdersPage() {
	const resultsRef = useRef<HTMLDivElement>(null);
	const { filters, updateFilters, clearFilters, setPage } =
		useAdminOrderFilters();
	const ordersQuery = useAdminOrders(filters);
	const orders = ordersQuery.data?.data ?? [];
	const total = ordersQuery.data?.total ?? 0;
	const totalPages = ordersQuery.data?.totalPages ?? 0;
	const page = filters.page ?? 1;
	const activeFilters = getActiveFilters(filters);

	useEffect(() => {
		if (totalPages > 0 && page > totalPages) {
			setPage(totalPages);
		}
	}, [page, setPage, totalPages]);

	const setFilter = (
		key: keyof AdminOrderListParams,
		value: string,
	) => updateFilters({ [key]: value });

	const handlePageChange = (nextPage: number) => {
		setPage(nextPage);
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		resultsRef.current?.scrollIntoView({
			behavior: reduceMotion ? "auto" : "smooth",
			block: "start",
		});
	};

	return (
		<section className={styles.page}>
			<header className={styles.heading}>
				<div>
					<p className={styles.eyebrow}>Fulfilment workspace</p>
					<h2>Orders</h2>
					<p>
						Review customer snapshots, payment state, and fulfilment
						progress from one secure workspace.
					</p>
				</div>
				<div className={styles.headingMark}>
					<ShoppingBag aria-hidden="true" />
					<span>Manual operations</span>
				</div>
			</header>

			<div className={styles.controls} ref={resultsRef}>
				<AdminOrderSearch
					key={filters.search ?? ""}
					onCommit={(search) =>
						updateFilters({ search }, { replace: true })
					}
					value={filters.search ?? ""}
				/>

				<div className={styles.filters}>
					<label>
						<span>Order status</span>
						<Select
							onChange={(event) => setFilter("status", event.target.value)}
							value={filters.status ?? ""}
						>
							<option value="">All order statuses</option>
							{ORDER_STATUS_VALUES.map((status) => (
								<option key={status} value={status}>
									{formatOrderStatus(status)}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Payment status</span>
						<Select
							onChange={(event) =>
								setFilter("paymentStatus", event.target.value)
							}
							value={filters.paymentStatus ?? ""}
						>
							<option value="">All payment statuses</option>
							{PAYMENT_STATUS_VALUES.map((status) => (
								<option key={status} value={status}>
									{formatPaymentStatus(status)}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Payment method</span>
						<Select
							onChange={(event) =>
								setFilter("paymentMethod", event.target.value)
							}
							value={filters.paymentMethod ?? ""}
						>
							<option value="">All payment methods</option>
							{PAYMENT_METHOD_VALUES.map((method) => (
								<option key={method} value={method}>
									{formatPaymentMethod(method)}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>Shipping</span>
						<Select
							onChange={(event) =>
								setFilter("shippingMethod", event.target.value)
							}
							value={filters.shippingMethod ?? ""}
						>
							<option value="">All shipping methods</option>
							{SHIPPING_METHOD_VALUES.map((method) => (
								<option key={method} value={method}>
									{formatShippingMethod(method)}
								</option>
							))}
						</Select>
					</label>
					<label>
						<span>From date</span>
						<Input
							aria-label="Orders from date"
							onChange={(event) =>
								setFilter("dateFrom", event.target.value)
							}
							type="date"
							value={filters.dateFrom ?? ""}
						/>
					</label>
					<label>
						<span>To date</span>
						<Input
							aria-label="Orders to date"
							onChange={(event) => setFilter("dateTo", event.target.value)}
							type="date"
							value={filters.dateTo ?? ""}
						/>
					</label>
					<label>
						<span>Minimum total</span>
						<Input
							aria-label="Minimum order total in PLN"
							min="0"
							onChange={(event) =>
								setFilter("minTotal", event.target.value)
							}
							placeholder="0"
							step="0.01"
							type="number"
							value={filters.minTotal ?? ""}
						/>
					</label>
					<label>
						<span>Maximum total</span>
						<Input
							aria-label="Maximum order total in PLN"
							min="0"
							onChange={(event) =>
								setFilter("maxTotal", event.target.value)
							}
							placeholder="Any"
							step="0.01"
							type="number"
							value={filters.maxTotal ?? ""}
						/>
					</label>
				</div>

				<div className={styles.controlFooter}>
					<div aria-live="polite" className={styles.resultCount}>
						<strong>{total}</strong> {total === 1 ? "order" : "orders"}
					</div>
					<label className={styles.sort}>
						<span>Sort by</span>
						<Select
							onChange={(event) => setFilter("sort", event.target.value)}
							value={filters.sort}
						>
							{sortOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</Select>
					</label>
				</div>

				{activeFilters.length > 0 ? (
					<div className={styles.activeFilters}>
						<span>Active filters</span>
						<div>
							{activeFilters.map((filter) => (
								<button
									aria-label={`Remove ${filter.label} filter`}
									key={filter.key}
									onClick={() => updateFilters({ [filter.key]: "" })}
									type="button"
								>
									{filter.label}
									<X aria-hidden="true" />
								</button>
							))}
						</div>
						<button onClick={clearFilters} type="button">
							Clear filters
						</button>
					</div>
				) : null}
			</div>

			{ordersQuery.isLoading ? <OrderListSkeleton /> : null}

			{ordersQuery.isError ? (
				<div className={styles.state} role="alert">
					<RefreshCcw aria-hidden="true" />
					<h3>We could not load the order workspace.</h3>
					<p>Check your connection and retry the request.</p>
					<Button onClick={() => void ordersQuery.refetch()}>
						Try again
					</Button>
				</div>
			) : null}

			{!ordersQuery.isLoading &&
			!ordersQuery.isError &&
			orders.length === 0 ? (
				<div className={styles.state}>
					<PackageOpen aria-hidden="true" />
					<h3>
						{activeFilters.length > 0
							? "No orders match the selected filters."
							: "No orders have been placed yet."}
					</h3>
					<p>
						{activeFilters.length > 0
							? "Adjust or clear the filters to review other orders."
							: "New customer orders will appear here automatically."}
					</p>
					{activeFilters.length > 0 ? (
						<Button onClick={clearFilters} variant="secondary">
							Clear filters
						</Button>
					) : null}
				</div>
			) : null}

			{orders.length > 0 ? (
				<div
					aria-busy={ordersQuery.isFetching}
					aria-live="polite"
					className={styles.results}
				>
					<OrderTable orders={orders} />
					<OrderCards orders={orders} />
					<Pagination
						ariaLabel="Admin order pages"
						currentPage={Math.min(page, Math.max(totalPages, 1))}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			) : null}
		</section>
	);
}
