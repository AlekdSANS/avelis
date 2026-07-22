import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { featuredProducts } from "../data/homepageContent";
import styles from "./HomepageSections.module.scss";

export function FeaturedFragrances() {
  return (
    <section aria-labelledby="featured-fragrances-title" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>The AVELIS edit</p>
            <h2 id="featured-fragrances-title">Featured fragrances</h2>
          </div>
          <p>Four compositions chosen for the changing light of the season.</p>
        </header>

        <div className={styles.productGrid}>
          {featuredProducts.map((product) => (
            <article className={styles.productCard} key={product.slug}>
              <Link className={styles.productImage} to={`/products/${product.slug}`}>
                <img alt={product.imageAlt} loading="lazy" src={product.image} />
                {product.badge ? <span>{product.badge}</span> : null}
              </Link>
              <div className={styles.productMeta}>
                <div>
                  <p>{product.family}</p>
                  <h3>{product.name}</h3>
                </div>
                <p className={styles.price}>From {product.price} PLN</p>
              </div>
              <Link className={styles.textLink} to={`/products/${product.slug}`}>
                View fragrance
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
