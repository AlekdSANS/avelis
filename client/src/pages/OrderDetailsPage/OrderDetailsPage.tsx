import { useParams } from "react-router-dom";
import styles from "./OrderDetailsPage.module.scss";

export function OrderDetailsPage() {
	const { id } = useParams();

  return (
    <section className={styles.page}>
      <h1>Order details</h1>
      <p>Order {id} will appear here after order placement is available.</p>
    </section>
  );
}
