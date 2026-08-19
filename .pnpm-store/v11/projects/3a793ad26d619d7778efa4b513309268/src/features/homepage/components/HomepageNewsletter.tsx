import { NewsletterForm } from "../../../components/common/NewsletterForm/NewsletterForm";
import styles from "./HomepageSections.module.scss";

export function HomepageNewsletter() {
  return (
    <section aria-labelledby="homepage-newsletter-title" className={styles.newsletterSection}>
      <div className={styles.newsletterInner}>
        <div>
          <p className={styles.eyebrow}>Private notes</p>
          <h2 id="homepage-newsletter-title">Letters from the atelier</h2>
          <p>
            Seasonal materials, new compositions and the atmosphere behind each
            release.
          </p>
        </div>
        <NewsletterForm className={styles.newsletterForm} />
      </div>
    </section>
  );
}
