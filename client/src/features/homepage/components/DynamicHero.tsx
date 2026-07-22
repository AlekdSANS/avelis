import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonLink } from "../../../components/ui/Button/Button";
import type { HomepageTheme } from "../types";
import styles from "./DynamicHero.module.scss";

type DynamicHeroProps = {
  theme: HomepageTheme;
};

export function DynamicHero({ theme }: DynamicHeroProps) {
  return (
    <section aria-labelledby="featured-collection-title" className={styles.hero}>
      <picture className={styles.media}>
        {theme.mobileImage ? (
          <source media="(max-width: 60rem)" srcSet={theme.mobileImage} />
        ) : null}
        <img
          alt={theme.imageAlt}
          fetchPriority="high"
          height="941"
          src={theme.image}
          width="1672"
        />
      </picture>

      <p aria-hidden="true" className={styles.editorialPhrase}>
        New collection
      </p>

      <div className={styles.content}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{theme.eyebrow}</p>
          <h1 id="featured-collection-title">{theme.title}</h1>
          <p className={styles.description}>{theme.description}</p>
          <div className={styles.actions}>
            <ButtonLink
              className={styles.primaryCta}
              style={{
                backgroundColor: "var(--home-accent-dark)",
                color: "var(--home-button-text)",
              }}
              to={`/products/${theme.collectionSlug}`}
            >
              Discover the fragrance
            </ButtonLink>
            <Link
              className={styles.secondaryCta}
              to={`/collections/${theme.collectionSlug}`}
            >
              Explore the collection
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <p aria-hidden="true" className={styles.campaignIndex}>
        AVELIS / 01
      </p>
    </section>
  );
}
