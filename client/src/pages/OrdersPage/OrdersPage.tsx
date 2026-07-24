import styles from "./OrdersPage.module.scss";

export function OrdersPage() {
  return (
    <section className={styles.page}>
      <h1>Orders</h1>
      <p>Your order history will appear here after checkout is available.</p>
    </section>
  );
}
