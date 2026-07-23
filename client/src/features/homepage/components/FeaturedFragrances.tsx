import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { featuredProducts } from "../data/homepageContent";
import styles from "./HomepageSections.module.scss";

type FeaturedFragrancesProps = {
  activeSlug: string;
};

export function FeaturedFragrances({ activeSlug }: FeaturedFragrancesProps) {
  const [selectedSlug, setSelectedSlug] = useState(activeSlug);

  return (
    <section
      aria-labelledby="featured-fragrances-title"
      className={[styles.section, styles.featuredSection].join(" ")}
    >
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <h2 id="featured-fragrances-title">Featured fragrances</h2>
          <p>Four compositions chosen for the changing light of the season.</p>
        </header>

        <div aria-label="Featured fragrance showcase" className={styles.productShowcase} role="list">
          {featuredProducts.map((product, index) => {
            const isActive = product.slug === selectedSlug;

            return (
              <article
                className={[
                  styles.productPanel,
                  isActive ? styles.activeProductPanel : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={product.slug}
                onFocusCapture={() => setSelectedSlug(product.slug)}
                onMouseEnter={() => setSelectedSlug(product.slug)}
                role="listitem"
                style={{ zIndex: isActive ? 8 : featuredProducts.length - index }}
              >
                <button
                  aria-expanded={isActive}
                  aria-label={`Show ${product.name} details`}
                  className={styles.panelTrigger}
                  onClick={() => setSelectedSlug(product.slug)}
                  onFocus={() => setSelectedSlug(product.slug)}
                  type="button"
                >
                  <img alt={product.imageAlt} loading="lazy" src={product.image} />
                  <span className={styles.badges}>
                    {product.badges.map((badge) => (
                      <span key={badge}>{badge}</span>
                    ))}
                  </span>
                  <span aria-hidden="true" className={styles.collapsedName}>
                    {product.name}
                  </span>
                </button>

                <div className={styles.panelDetails}>
                  <p className={styles.collectionLabelText}>{product.collectionLabel}</p>
                  <p className={styles.productFamily}>{product.family}</p>
                  <h3>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productFooter}>
                    <p className={styles.price}>From {product.price} PLN</p>
                    <Link className={styles.textLink} to={`/products/${product.slug}`}>
                      View fragrance
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p aria-hidden="true" className={styles.swipeCue}>Swipe to explore</p>
      </div>
    </section>
  );
}
