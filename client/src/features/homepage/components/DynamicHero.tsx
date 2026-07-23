import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import type { HomepageTheme } from "../types";
import styles from "./DynamicHero.module.scss";

type DynamicHeroProps = {
  theme: HomepageTheme;
};

function getTitleColumns(title: string) {
  const midpointByTitle: Record<string, number> = {
    peachwood: 5,
    redwood: 3,
  };
  const letters = Array.from(title.toUpperCase());
  const midpoint = midpointByTitle[title.toLowerCase()] ?? Math.ceil(letters.length / 2);

  return [letters.slice(0, midpoint), letters.slice(midpoint)];
}

export function DynamicHero({ theme }: DynamicHeroProps) {
  const titleColumns = getTitleColumns(theme.title);

  return (
    <section aria-labelledby="featured-collection-title" className={styles.hero}>
      <picture className={styles.media}>
        {theme.mobileImage ? (
          <source media="(max-width: 64rem)" srcSet={theme.mobileImage} />
        ) : null}
        <img
          alt={theme.imageAlt}
          fetchPriority="high"
          height="941"
          src={theme.image}
          width="1672"
        />
      </picture>

      <div aria-hidden="true" className={styles.imageFade} />

      <div className={styles.content}>
        <div className={styles.masthead}>
          <p className={styles.campaignTitle}>
            <span>New</span>
            <span>Collection</span>
          </p>
          <h1 id="featured-collection-title">
            <Link
              aria-label={`${theme.title} collection`}
              className={styles.verticalName}
              to={`/collections/${theme.collectionSlug}`}
            >
              {titleColumns.map((column, columnIndex) => (
                <span className={styles.nameColumn} key={`${theme.id}-${columnIndex}`}>
                  {column.map((letter, letterIndex) => (
                    <span
                      aria-hidden="true"
                      key={`${letter}-${columnIndex}-${letterIndex}`}
                      style={
                        {
                          "--letter-index": columnIndex * 5 + letterIndex,
                        } as CSSProperties
                      }
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              ))}
            </Link>
          </h1>
        </div>

        <p className={styles.description}>{theme.description}</p>
        <p aria-hidden="true" className={styles.campaignIndex}>
          AVELIS / 01
        </p>
      </div>
    </section>
  );
}
