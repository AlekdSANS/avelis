import styles from "./OrderDetailsPage.module.scss";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Price } from "../../components/ui/Price/Price";
import { Skeleton } from "../../components/ui/Skeleton/Skeleton";
import { OrderStatusBadges } from "../../features/orders/components/OrderStatusBadges";
import { useOrderByNumber } from "../../features/orders/hooks/useOrderByNumber";
import {
  formatOrderDate,
  formatPaymentMethod,
  formatShippingMethod,
} from "../../features/orders/utils/orderFormatters";
import { ProductImage } from "../../features/products/components/ProductImage";
import { ApiClientError } from "../../services/apiClient";
import type { Order } from "../../types/order";

function OrderDetailSkeleton() {
  return (
    <section
      aria-label="Loading order details"
      className={styles.page}
      role="status"
    >
      <Skeleton className={styles.skeletonHeading} />
      <div className={styles.layout}>
        <Skeleton className={styles.skeletonDetails} />
        <Skeleton className={styles.skeletonSummary} />
      </div>
    </section>
  );
}

function OrderDetailError({
  message,
  onRetry,
  title,
}: {
  message: string;
  onRetry?: () => void;
  title: string;
}) {
  return (
    <section className={styles.errorState} role="alert">
      <p className={styles.eyebrow}>Order details</p>
      <h1>{title}</h1>
      <p>{message}</p>
      <div className={styles.actions}>
        {onRetry ? (
          <Button onClick={onRetry}>
            <RotateCcw aria-hidden="true" />
            Try again
          </Button>
        ) : null}
        <ButtonLink to="/account/orders" variant="secondary">
          Back to orders
        </ButtonLink>
      </div>
    </section>
  );
}

function OrderDetail({ order }: { order: Order }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className={styles.page}>
      <Link className={styles.backLink} to="/account/orders">
        <ArrowLeft aria-hidden="true" />
        Back to orders
      </Link>

      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Order details</p>
          <h1 ref={headingRef} tabIndex={-1}>
            {order.orderNumber}
          </h1>
          <p>
            Placed{" "}
            <time dateTime={order.createdAt}>
              {formatOrderDate(order.createdAt)}
            </time>
          </p>
        </div>
        <OrderStatusBadges
          orderStatus={order.status}
          paymentStatus={order.paymentStatus}
        />
      </header>

      <div className={styles.layout}>
        <div className={styles.detailsColumn}>
          <section aria-labelledby="order-items-title" className={styles.panel}>
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Historical snapshot</p>
              <h2 id="order-items-title">Items</h2>
            </div>
            <ul className={styles.items}>
              {order.items.map((item) => {
                const itemHeading = <h3>{item.productName}</h3>;

                return (
                  <li className={styles.item} key={item.id}>
                    <ProductImage
                      alt={`${item.productName} ${item.format === "BOTTLE" ? "bottle" : "refill"}`}
                      className={styles.itemImage}
                      src={
                        item.imageUrl ??
                        "/images/placeholders/product_placeholder.png"
                      }
                    />
                    <div className={styles.itemCopy}>
                      {item.productId === null ? (
                        itemHeading
                      ) : (
                        <Link to={`/products/${item.productSlug}`}>
                          {itemHeading}
                        </Link>
                      )}
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
                );
              })}
            </ul>
          </section>

          <div className={styles.informationGrid}>
            <section
              aria-labelledby="order-delivery-title"
              className={styles.panel}
            >
              <div className={styles.sectionHeading}>
                <p className={styles.eyebrow}>Delivery</p>
                <h2 id="order-delivery-title">Shipping address</h2>
              </div>
              <address className={styles.address}>
                <span>
                  {order.customer.firstName} {order.customer.lastName}
                </span>
                <span>
                  {order.shippingAddress.street}{" "}
                  {order.shippingAddress.building}
                  {order.shippingAddress.apartment
                    ? `/${order.shippingAddress.apartment}`
                    : ""}
                </span>
                <span>
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.city}
                </span>
                <span>
                  {order.shippingAddress.country === "PL"
                    ? "Poland"
                    : order.shippingAddress.country}
                </span>
              </address>
              {order.shippingAddress.deliveryNotes ? (
                <p className={styles.notes}>
                  Delivery note: {order.shippingAddress.deliveryNotes}
                </p>
              ) : null}
            </section>

            <section
              aria-labelledby="order-contact-title"
              className={styles.panel}
            >
              <div className={styles.sectionHeading}>
                <p className={styles.eyebrow}>Customer</p>
                <h2 id="order-contact-title">Contact and methods</h2>
              </div>
              <dl className={styles.meta}>
                <div>
                  <dt>Email</dt>
                  <dd>{order.customer.email}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{order.customer.phone}</dd>
                </div>
                <div>
                  <dt>Payment</dt>
                  <dd>{formatPaymentMethod(order.paymentMethod)}</dd>
                </div>
                <div>
                  <dt>Delivery</dt>
                  <dd>{formatShippingMethod(order.shippingMethod)}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>

        <aside aria-labelledby="order-total-title" className={styles.summary}>
          <p className={styles.eyebrow}>Backend-authoritative totals</p>
          <h2 id="order-total-title">Order summary</h2>
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
            {order.discountTotal !== 0 ? (
              <div>
                <dt>Discount</dt>
                <dd>
                  -<Price
                    currency={order.currency}
                    value={order.discountTotal}
                  />
                </dd>
              </div>
            ) : null}
            <div className={styles.total}>
              <dt>Total</dt>
              <dd>
                <Price currency={order.currency} value={order.total} />
              </dd>
            </div>
          </dl>
          <p>
            These prices are the snapshots recorded when the order was
            created.
          </p>
        </aside>
      </div>

      <div className={styles.actions}>
        <ButtonLink to="/account/orders" variant="secondary">
          <ArrowLeft aria-hidden="true" />
          Back to orders
        </ButtonLink>
        <ButtonLink to="/shop">
          Continue shopping
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}

export function OrderDetailsPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const orderQuery = useOrderByNumber(orderNumber);

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      orderQuery.data === undefined
        ? "Order details | AVELIS"
        : `Order ${orderQuery.data.orderNumber} | AVELIS`;

    return () => {
      document.title = previousTitle;
    };
  }, [orderQuery.data]);

  if (!orderQuery.validOrderNumber) {
    return (
      <OrderDetailError
        message="The order number in this address is missing or invalid."
        title="We could not find this order."
      />
    );
  }

  if (orderQuery.isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (orderQuery.error && orderQuery.data === undefined) {
    const error =
      orderQuery.error instanceof ApiClientError ? orderQuery.error : null;

    if (error?.statusCode === 401) {
      return (
        <OrderDetailError
          message="Your session has expired. Please sign in again to view this order."
          title="Authentication required"
        />
      );
    }

    if (error?.statusCode === 404) {
      return (
        <OrderDetailError
          message="The order could not be found or does not belong to this account."
          title="We could not find this order."
        />
      );
    }

    return (
      <OrderDetailError
        message="Please check your connection and try again."
        onRetry={() => void orderQuery.refetch()}
        title="We could not load this order."
      />
    );
  }

  if (orderQuery.data === undefined) {
    return (
      <OrderDetailError
        message="The order details are unavailable."
        title="We could not find this order."
      />
    );
  }

  return <OrderDetail order={orderQuery.data} />;
}
