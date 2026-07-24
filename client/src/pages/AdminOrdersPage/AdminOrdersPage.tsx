import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./AdminOrdersPage.module.scss";

export function AdminOrdersPage() {
  return (
    <section className={styles.page}>
      <div className={styles.icon}>
        <ShoppingBag aria-hidden="true" />
      </div>
      <p className={styles.eyebrow}>Future admin phase</p>
      <h2>Order management is not active yet.</h2>
      <p>
        The order list, detail workspace, and status controls will be added in a
        later admin phase. The dashboard remains read-only in this foundation.
      </p>
      <Link to="/admin">
        <ArrowLeft aria-hidden="true" />
        Return to dashboard
      </Link>
    </section>
  );
}
