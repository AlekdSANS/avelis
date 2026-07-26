import { ArrowRight } from "lucide-react";

import { ButtonLink } from "../../../components/ui/Button/Button";
import { formatDetails } from "../data/aboutContent";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function BottleRefillSection() {
  return (
    <section aria-labelledby="formats-title" className={styles.formats}>
      <header className={styles.formatsHeader}>
        <p className={styles.eyebrow}>Bottle and refill</p>
        <h2 id="formats-title">Keep the object. Renew the scent.</h2>
        <p>
          The bottle begins the relationship; the refill lets the same object
          remain at the centre of it.
        </p>
      </header>

      <div className={styles.formatGrid}>
        {formatDetails.map((format) => (
          <article key={format.title}>
            <p className={styles.formatEyebrow}>{format.eyebrow}</p>
            <div className={styles.formatHeading}>
              <h3>{format.title}</h3>
              <span>{format.sizes}</span>
            </div>
            <p className={styles.formatDescription}>{format.description}</p>
            <ButtonLink to={format.to} variant="secondary">
              {format.action}
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </article>
        ))}
      </div>
    </section>
  );
}
