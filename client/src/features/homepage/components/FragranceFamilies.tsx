import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { fragranceFamilies } from "../data/homepageContent";
import styles from "./HomepageSections.module.scss";

export function FragranceFamilies() {
  return (
    <section aria-labelledby="fragrance-families-title" className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>Follow a note</p>
            <h2 id="fragrance-families-title">Fragrance families</h2>
          </div>
          <p>Begin with the atmosphere you want to carry.</p>
        </header>

        <div className={styles.familyGrid}>
          {fragranceFamilies.map((family, index) => (
            <Link
              className={styles.familyCard}
              key={family.name}
              to={`/shop?family=${family.query}`}
            >
              <span className={styles.familyNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{family.name}</h3>
              <p>{family.description}</p>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
