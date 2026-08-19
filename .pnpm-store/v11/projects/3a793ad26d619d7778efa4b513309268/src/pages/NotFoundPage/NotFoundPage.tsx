import { ArrowLeft, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDocumentMetadata } from "../../hooks/useDocumentMetadata";
import styles from "./NotFoundPage.module.scss";

export function NotFoundPage() {
  const location = useLocation();
  useDocumentMetadata({
    canonicalPath: location.pathname,
    description: "The requested AVELIS page could not be found.",
    robots: "noindex,nofollow",
    title: "Page not found | AVELIS",
  });

  return (
    <section className={styles.page}>
      <div aria-hidden="true" className={styles.mark}>404</div>
      <p className={styles.eyebrow}>A trace, now absent</p>
      <h1>This page has left the collection.</h1>
      <p className={styles.copy}>
        The address may be incomplete, or the page may have moved as the AVELIS catalogue evolved.
      </p>
      <div className={styles.actions}>
        <Link className={styles.primary} to="/shop"><Search aria-hidden="true" />Explore fragrances</Link>
        <Link to="/"><ArrowLeft aria-hidden="true" />Return home</Link>
      </div>
    </section>
  );
}
