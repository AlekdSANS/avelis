import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import { useFeaturedProducts } from "../../products/hooks/useProducts";
import {
  getCheapestVariant,
  getCollectionLabel,
  getPrimaryProductImage,
} from "../../products/utils/productCatalog";
import styles from "./HomepageSections.module.scss";

type FeaturedFragrancesProps = {
  activeSlug: string;
};

export function FeaturedFragrances({ activeSlug }: FeaturedFragrancesProps) {
  const featuredQuery = useFeaturedProducts(4);
  const featuredProducts = featuredQuery.data ?? [];
  const [selectedSlug, setSelectedSlug] = useState(activeSlug);

  useEffect(() => {
    if (featuredProducts.some((product) => product.slug === activeSlug)) {
      setSelectedSlug(activeSlug);
      return;
    }

    if (featuredProducts[0]) {
      setSelectedSlug(featuredProducts[0].slug);
    }
  }, [activeSlug, featuredProducts]);

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

        {featuredQuery.isLoading ? (
          <div
            aria-busy="true"
            aria-label="Loading featured fragrances"
            className={styles.productShowcase}
          >
            {Array.from({ length: 4 }, (_, index) => (
              <Skeleton
                key={index}
                style={{ borderRadius: "1.5rem", minHeight: "26rem" }}
              />
            ))}
          </div>
        ) : null}

        {!featuredQuery.isLoading && featuredProducts.length > 0 ? (
          <div
            aria-label="Featured fragrance showcase"
            className={styles.productShowcase}
            role="list"
          >
            {featuredProducts.map((product, index) => {
              const isActive = product.slug === selectedSlug;
              const image = getPrimaryProductImage(product);
              const cheapestVariant = getCheapestVariant(product.variants);
              const badges = [
                product.isNew ? "New" : undefined,
                product.isLimited ? "Limited" : undefined,
                product.isFeatured ? "Featured" : undefined,
              ].filter((badge): badge is string => Boolean(badge));

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
                    <img alt={image.alt} loading="lazy" src={image.url} />
                    <span className={styles.badges}>
                      {badges.map((badge) => (
                        <span key={badge}>{badge}</span>
                      ))}
                    </span>
                    <span aria-hidden="true" className={styles.collapsedName}>
                      {product.name}
                    </span>
                  </button>

                  <div className={styles.panelDetails}>
                    <p className={styles.collectionLabelText}>
                      {getCollectionLabel(product)}
                    </p>
                    <p className={styles.productFamily}>{product.fragranceFamily}</p>
                    <h3>{product.name}</h3>
                    <p className={styles.productDescription}>{product.description}</p>
                    <div className={styles.productFooter}>
                      <p className={styles.price}>
                        {cheapestVariant
                          ? `From ${cheapestVariant.price} PLN`
                          : "Currently unavailable"}
                      </p>
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
        ) : null}

        {!featuredQuery.isLoading && !featuredQuery.isError && featuredProducts.length === 0 ? (
          <p>No featured fragrances are available right now.</p>
        ) : null}

        <p aria-hidden="true" className={styles.swipeCue}>Swipe to explore</p>
      </div>
    </section>
  );
}
