import styles from "./OrderConfirmationPage.module.scss";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { Price } from "../../components/ui/Price/Price";
import { ProductImage } from "../../features/products/components/ProductImage";
import { useOrderConfirmation } from "../../features/orders/hooks/useOrderConfirmation";
import {
  formatOrderDate,
  formatOrderStatus,
  formatPaymentMethod,
  formatPaymentStatus,
  formatShippingMethod,
} from "../../features/orders/utils/orderFormatters";
import { ApiClientError } from "../../services/apiClient";
import type { Order } from "../../types/order";

type ConfirmationErrorProps = {
  action?: "retry" | "sign-in";
  message: string;
  onRetry?: () => void;
  title: string;
};

function ConfirmationError({
  action,
  message,
  onRetry,
  title,
}: ConfirmationErrorProps) {
  return (
    <main className={styles.statePage}>
      <section className={styles.statePanel} role="alert">
        <p className={styles.eyebrow}>Order confirmation</p>
        <h1>{title}</h1>
        <p>{message}</p>
        <div className={styles.stateActions}>
          {action === "retry" && onRetry ? (
            <Button onClick={onRetry}>
              <RotateCcw aria-hidden="true" />
              Try again
            </Button>
          ) : null}
          {action === "sign-in" ? (
            <ButtonLink to="/login">Sign in</ButtonLink>
          ) : null}
          <ButtonLink to="/shop" variant="secondary">
            Return to Shop
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}

function ConfirmationSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading order confirmation"
      className={styles.page}
    >
      <p className={styles.loadingAnnouncement} role="status">
        Loading order confirmation...
      </p>
      <div className={styles.skeletonHero} />
      <div className={styles.layout}>
        <div className={styles.skeletonDetails} />
        <div className={styles.skeletonTotals} />
      </div>
    </main>
  );
}

function getPaymentMessage(order: Order) {
  if (order.paymentMethod === "CASH_ON_DELIVERY") {
    return "Payment will be collected on delivery.";
  }

  if (
    order.status === "PENDING_PAYMENT" ||
    order.paymentStatus === "PENDING"
  ) {
    return "Your order has been created and is awaiting payment confirmation.";
  }

  if (order.paymentStatus === "PAID") {
    return "Payment has been confirmed.";
  }

  return `Payment status: ${formatPaymentStatus(order.paymentStatus)}.`;
}

function OrderDetails({
  isAuthenticated,
  isGuest,
  order,
}: {
  isAuthenticated: boolean;
  isGuest: boolean;
  order: Order;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span aria-hidden="true" className={styles.successMark}>
          <Check />
        </span>
        <p className={styles.eyebrow}>Order received</p>
        <h1 ref={headingRef} tabIndex={-1}>
          Your order is confirmed
        </h1>
        <p>Thank you. We&apos;ve received your AVELIS order.</p>
        <p className={styles.paymentMessage}>{getPaymentMessage(order)}</p>
      </header>

      {isGuest ? (
        <p className={styles.guestNotice}>
          Keep your order number for reference. Secure guest confirmation
          reload is not available yet, so refreshing this page will remove
          access to these details.
        </p>
      ) : null}

      <div className={styles.layout}>
        <div className={styles.detailsColumn}>
          <section
            aria-labelledby="confirmation-overview-title"
            className={styles.panel}
          >
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Order details</p>
              <h2 id="confirmation-overview-title">{order.orderNumber}</h2>
            </div>
            <dl className={styles.metaGrid}>
              <div>
                <dt>Placed</dt>
                <dd>
                  <time dateTime={order.createdAt}>
                    {formatOrderDate(order.createdAt)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>Order status</dt>
                <dd>
                  <span className={styles.status}>
                    {formatOrderStatus(order.status)}
                  </span>
                </dd>
              </div>
              <div>
                <dt>Payment status</dt>
                <dd>{formatPaymentStatus(order.paymentStatus)}</dd>
              </div>
              <div>
                <dt>Payment method</dt>
                <dd>{formatPaymentMethod(order.paymentMethod)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{formatShippingMethod(order.shippingMethod)}</dd>
              </div>
              <div>
                <dt>Order contact</dt>
                <dd>{order.customer.email}</dd>
              </div>
            </dl>
          </section>

          <section
            aria-labelledby="confirmation-items-title"
            className={styles.panel}
          >
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Your selection</p>
              <h2 id="confirmation-items-title">Order items</h2>
            </div>
            <ul className={styles.items}>
              {order.items.map((item) => (
                <li className={styles.item} key={item.id}>
                  <ProductImage
                    alt={`${item.productName} ${item.format === "BOTTLE" ? "bottle" : "refill"}`}
                    className={styles.itemImage}
                    src={
                      item.imageUrl ??
                      "/images/placeholders/product_placeholder.png"
                    }
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.productName}</h3>
                    <p>
                      {item.format === "BOTTLE" ? "Bottle" : "Refill"} ·{" "}
                      {item.volumeMl} ml · Qty {item.quantity}
                    </p>
                    <p className={styles.sku}>SKU {item.sku}</p>
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

          <section
            aria-labelledby="confirmation-address-title"
            className={styles.panel}
          >
            <div className={styles.sectionHeading}>
              <p className={styles.eyebrow}>Delivery</p>
              <h2 id="confirmation-address-title">Shipping address</h2>
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
              <p className={styles.deliveryNotes}>
                Delivery note: {order.shippingAddress.deliveryNotes}
              </p>
            ) : null}
          </section>
        </div>

        <aside aria-labelledby="confirmation-summary-title" className={styles.summary}>
          <p className={styles.eyebrow}>Backend-authoritative totals</p>
          <h2 id="confirmation-summary-title">Order summary</h2>
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
          <p className={styles.authorityNote}>
            Prices and availability were verified by AVELIS when your order was
            created.
          </p>
        </aside>
      </div>

      <div className={styles.actions}>
        <ButtonLink to="/shop">
          Continue shopping
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
        {isAuthenticated ? (
          <ButtonLink
            to={`/account/orders/${encodeURIComponent(order.orderNumber)}`}
            variant="secondary"
          >
            View order
          </ButtonLink>
        ) : null}
      </div>
    </main>
  );
}

export function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const confirmation = useOrderConfirmation(orderNumber);

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      confirmation.data === undefined
        ? "Order confirmation | AVELIS"
        : `Order ${confirmation.data.orderNumber} | AVELIS`;

    return () => {
      document.title = previousTitle;
    };
  }, [confirmation.data]);

  if (!confirmation.validOrderNumber) {
    return (
      <ConfirmationError
        message="The order number in this address is missing or invalid."
        title="We could not find this order confirmation."
      />
    );
  }

  if (
    confirmation.data === undefined &&
    (confirmation.authLoading || confirmation.isLoading)
  ) {
    return <ConfirmationSkeleton />;
  }

  if (confirmation.guestConfirmationUnavailable) {
    return (
      <ConfirmationError
        message="Guest order details are available immediately after checkout. Secure guest refresh access has not been implemented yet."
        title="This confirmation link is no longer available."
      />
    );
  }

  if (confirmation.authError && confirmation.data === undefined) {
    return (
      <ConfirmationError
        action="retry"
        message="We could not check your account session. Please try again."
        onRetry={() => {
          void confirmation.refetchAuth();
        }}
        title="We could not load your order."
      />
    );
  }

  if (confirmation.error && confirmation.data === undefined) {
    const error =
      confirmation.error instanceof ApiClientError
        ? confirmation.error
        : null;

    if (error?.statusCode === 401) {
      return (
        <ConfirmationError
          action="sign-in"
          message="Please sign in to view this order."
          title="Authentication required"
        />
      );
    }

    if (error?.statusCode === 404) {
      return (
        <ConfirmationError
          message="The order could not be found or is not available to this account."
          title="We could not find this order confirmation."
        />
      );
    }

    return (
      <ConfirmationError
        action="retry"
        message="We could not load your order. Please try again."
        onRetry={() => {
          void confirmation.refetch();
        }}
        title="Order details are unavailable"
      />
    );
  }

  if (confirmation.data === undefined) {
    return (
      <ConfirmationError
        message="The order details are not available."
        title="We could not find this order confirmation."
      />
    );
  }

  return (
    <OrderDetails
      isAuthenticated={
        confirmation.currentUser !== null &&
        confirmation.currentUser !== undefined
      }
      isGuest={confirmation.currentUser === null}
      order={confirmation.data}
    />
  );
}
