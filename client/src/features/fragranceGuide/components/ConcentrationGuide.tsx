import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { concentrations } from "../data/fragranceGuideContent";
import { buildGuideShopHref } from "../utils/shopLinks";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function ConcentrationGuide() {
  return (
    <section
      aria-labelledby="concentration-guide-title"
      className={styles.section}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="Concentration describes the relative proportion of aromatic material in a formula. It can shape presence and depth, though wear always varies by fragrance and skin."
          eyebrow="Presence and depth"
          heading="Concentration guide"
          id="concentration-guide-title"
        />

        <div className={styles.comparison} role="list">
          {concentrations.map((concentration, index) => (
            <article className={styles.comparisonCard} key={concentration.name} role="listitem">
              <span className={styles.comparisonIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{concentration.name}</h3>
              <dl>
                <div>
                  <dt>Relative intensity</dt>
                  <dd>{concentration.intensity}</dd>
                </div>
                <div>
                  <dt>Impression</dt>
                  <dd>{concentration.longevity}</dd>
                </div>
                <div>
                  <dt>Character</dt>
                  <dd>{concentration.character}</dd>
                </div>
              </dl>
              <p>{concentration.context}</p>
              <Link
                to={buildGuideShopHref({
                  concentration: concentration.name,
                })}
              >
                Explore {concentration.name}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
