import styles from "./OrdersPage.module.scss";
import { ArrowRight, PackageOpen, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import { Price } from "../../components/ui/Price/Price";
import { Select } from "../../components/ui/Select/Select";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { ProductImage } from "../../features/products/components/ProductImage";
import { OrderStatusBadges } from "../../features/orders/components/OrderStatusBadges";
import { useOrders } from "../../features/orders/hooks/useOrders";
import {
  formatOrderDate,
  formatOrderStatus,
  ORDER_STATUS_VALUES,
} from "../../features/orders/utils/orderFormatters";
import type { OrderStatus, OrderSummary } from "../../types/order";

const ORDERS_PER_PAGE = 6;

function parsePage(value: string | null) {
  if (value === null) {
    return 1;
  }

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function parseStatus(value: string | null): OrderStatus | undefined {
  return ORDER_STATUS_VALUES.find((status) => status === value);
}

function OrderHistorySkeleton() {
  return (
    <div aria-label="Loading order history" className={styles.cards} role="status">
      {Array.from({ length: 3 }, (_, index) => (
        <article className={styles.skeletonCard} key={index}>
          <Skeleton className={styles.skeletonImage} />
          <div className={styles.skeletonCopy}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </article>
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: OrderSummary }) {
  return (
    <article className={styles.card}>
      <ProductImage
        alt={
          order.firstItemImageUrl === null
            ? ""
            : `First item from order ${order.orderNumber}`
        }
        className={styles.image}
        src={
          order.firstItemImageUrl ??
          "/images/placeholders/product_placeholder.png"
        }
      />
      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <div>
            <p className={styles.orderDate}>
              <time dateTime={order.createdAt}>
                {formatOrderDate(order.createdAt)}
              </time>
            </p>
            <h2>{order.orderNumber}</h2>
          </div>
          <OrderStatusBadges
            orderStatus={order.status}
            paymentStatus={order.paymentStatus}
          />
        </div>
        <dl className={styles.cardMeta}>
          <div>
            <dt>Items</dt>
            <dd>
              {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
            </dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>
              <Price currency={order.currency} value={order.total} />
            </dd>
          </div>
        </dl>
        <Link
          aria-label={`View order ${order.orderNumber}, ${formatOrderStatus(order.status)}`}
          className={styles.detailsLink}
          to={`/account/orders/${encodeURIComponent(order.orderNumber)}`}
        >
          View order
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const headingRef = useRef<HTMLDivElement>(null);
  const page = parsePage(searchParams.get("page"));
  const status = parseStatus(searchParams.get("status"));
  const ordersQuery = useOrders({
    page,
    limit: ORDERS_PER_PAGE,
    status,
  });
  const orders = ordersQuery.data?.data ?? [];
  const totalPages = ordersQuery.data?.totalPages ?? 0;

  useEffect(() => {
    if (totalPages > 0 && page > totalPages) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set("page", String(totalPages));
      setSearchParams(nextParams, { replace: true });
    }
  }, [page, searchParams, setSearchParams, totalPages]);

  const setPage = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextPage <= 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", String(nextPage));
    }

    setSearchParams(nextParams);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    headingRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const setStatus = (value: string) => {
    const nextParams = new URLSearchParams();

    if (value !== "ALL" && parseStatus(value) !== undefined) {
      nextParams.set("status", value);
    }

    setSearchParams(nextParams);
  };

  return (
    <section className={styles.page}>
      <header className={styles.heading} ref={headingRef}>
        <div>
          <p className={styles.eyebrow}>Account</p>
          <h1>Your orders</h1>
          <p>Review each AVELIS selection and its current fulfilment status.</p>
        </div>
        <div className={styles.filter}>
          <label htmlFor="order-status-filter">Status</label>
          <Select
            id="order-status-filter"
            onChange={(event) => setStatus(event.target.value)}
            value={status ?? "ALL"}
          >
            <option value="ALL">All orders</option>
            {ORDER_STATUS_VALUES.map((statusValue) => (
              <option key={statusValue} value={statusValue}>
                {formatOrderStatus(statusValue)}
              </option>
            ))}
          </Select>
        </div>
      </header>

      {ordersQuery.isLoading ? <OrderHistorySkeleton /> : null}

      {ordersQuery.isError ? (
        <div className={styles.errorState} role="alert">
          <h2>We could not load your orders.</h2>
          <p>Please check your connection and try again.</p>
          <Button onClick={() => void ordersQuery.refetch()}>
            <RotateCcw aria-hidden="true" />
            Try again
          </Button>
        </div>
      ) : null}

      {!ordersQuery.isLoading &&
      !ordersQuery.isError &&
      orders.length === 0 ? (
        <div className={styles.emptyState}>
          <PackageOpen aria-hidden="true" />
          <h2>
            {status
              ? "No orders match this status."
              : "You have not placed any orders yet."}
          </h2>
          <p>
            {status
              ? "Choose another status to see the rest of your order history."
              : "Your completed AVELIS selections will appear here."}
          </p>
          {status ? (
            <Button onClick={() => setStatus("ALL")} variant="secondary">
              Show all orders
            </Button>
          ) : (
            <ButtonLink to="/shop">Explore fragrances</ButtonLink>
          )}
        </div>
      ) : null}

      {orders.length > 0 ? (
        <>
          <div
            aria-busy={ordersQuery.isFetching}
            aria-live="polite"
            className={styles.cards}
          >
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
          <Pagination
            ariaLabel="Order history pages"
            currentPage={Math.min(page, Math.max(totalPages, 1))}
            onPageChange={setPage}
            totalPages={totalPages}
          />
        </>
      ) : null}
    </section>
  );
}
