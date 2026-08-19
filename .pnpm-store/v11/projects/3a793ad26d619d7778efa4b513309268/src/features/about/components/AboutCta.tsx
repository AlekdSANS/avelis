import { ArrowRight } from "lucide-react";

import { ButtonLink } from "../../../components/ui/Button/Button";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function AboutCta() {
  return (
    <section aria-labelledby="about-cta-title" className={styles.finalCta}>
      <p className={styles.eyebrow}>Continue exploring</p>
      <h2 id="about-cta-title">Discover the world that feels like yours</h2>
      <p>Explore Avelis fragrances through collections, notes and form.</p>
      <div className={styles.actions}>
        <ButtonLink to="/shop">
          Shop all fragrances
          <ArrowRight aria-hidden="true" />
        </ButtonLink>
        <ButtonLink to="/collections" variant="secondary">
          View collections
        </ButtonLink>
        <ButtonLink to="/fragrance-guide" variant="ghost">
          Read the fragrance guide
        </ButtonLink>
      </div>
    </section>
  );
}
