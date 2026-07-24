import { ArrowLeft, Package } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./AdminProductsPage.module.scss";

export function AdminProductsPage() {
  return (
    <section className={styles.page}>
      <div className={styles.icon}>
        <Package aria-hidden="true" />
      </div>
      <p className={styles.eyebrow}>Admin Part 2</p>
      <h2>Product management comes next.</h2>
      <p>
        The product list, creation flow, editing, and catalogue controls will be
        implemented in the next admin phase. No product data can be changed here
        yet.
      </p>
      <Link to="/admin">
        <ArrowLeft aria-hidden="true" />
        Return to dashboard
      </Link>
    </section>
  );
}
