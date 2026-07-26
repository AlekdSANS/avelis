import { ArrowRight } from "lucide-react";

import { ButtonLink } from "../../../components/ui/Button/Button";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function AboutHero() {
  return (
    <section aria-labelledby="about-title" className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>About Avelis</p>
        <h1 id="about-title">Fragrance shaped into form</h1>
        <p className={styles.heroDescription}>
          AVELIS explores scent as atmosphere, object and personal ritual.
        </p>
        <div className={styles.actions}>
          <ButtonLink to="/collections">
            Explore collections
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/shop" variant="secondary">
            Shop fragrances
          </ButtonLink>
        </div>
      </div>

      <figure className={styles.heroMedia}>
        <img
          alt="A frosted perfume bottle arranged with magnolia branches and weathered wood"
          fetchPriority="high"
          height="941"
          src="/images/hero/home_hero_peach.png"
          width="1672"
        />
        <figcaption>
          Scent, botanical texture and sculptural form in one composition.
        </figcaption>
      </figure>
    </section>
  );
}
