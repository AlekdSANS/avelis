import styles from "./OrderConfirmationPage.module.scss";
import { useParams } from "react-router-dom";

import { useOrderConfirmation } from "../../features/orders/hooks/useOrderConfirmation";

export function OrderConfirmationPage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const confirmation = useOrderConfirmation(orderNumber);

  if (!confirmation.validOrderNumber) {
    return (
      <main className={styles.page}>
        <h1>We could not find this order confirmation.</h1>
      </main>
    );
  }

  if (
    confirmation.data === undefined &&
    (confirmation.authLoading || confirmation.isLoading)
  ) {
    return (
      <main aria-busy="true" className={styles.page}>
        <p role="status">Loading order confirmation...</p>
      </main>
    );
  }

  if (confirmation.guestConfirmationUnavailable) {
    return (
      <main className={styles.page}>
        <h1>This confirmation link is no longer available.</h1>
        <p>
          Guest order details are available immediately after checkout, but
          secure guest refresh access has not been implemented yet.
        </p>
      </main>
    );
  }

  if (confirmation.data === undefined) {
    return (
      <main className={styles.page}>
        <h1>We could not load your order.</h1>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <h1>Your order is confirmed</h1>
      <p>Order {confirmation.data.orderNumber}</p>
    </main>
  );
}
