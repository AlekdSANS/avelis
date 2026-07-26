import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { guideFamilies } from "../data/fragranceGuideContent";
import { buildGuideShopHref } from "../utils/shopLinks";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function FragranceFamilyGrid() {
  return (
    <section
      aria-labelledby="fragrance-families-title"
      className={styles.section}
      id="fragrance-families"
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="Families are broad ways of describing a composition. Many fragrances move between them, but each offers a useful place to begin."
          eyebrow="Begin with an atmosphere"
          heading="Fragrance families"
          id="fragrance-families-title"
        />

        <div className={styles.familyGrid}>
          {guideFamilies.map((family, index) => (
            <article className={styles.familyCard} key={family.name}>
              <div className={styles.familyCardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{family.character}</p>
              </div>
              <h3>{family.name}</h3>
              <p className={styles.familyDescription}>{family.description}</p>
              <dl>
                <div>
                  <dt>Best considered for</dt>
                  <dd>{family.occasion}</dd>
                </div>
              </dl>
              <Link to={buildGuideShopHref({ family: family.name })}>
                Explore {family.name}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
