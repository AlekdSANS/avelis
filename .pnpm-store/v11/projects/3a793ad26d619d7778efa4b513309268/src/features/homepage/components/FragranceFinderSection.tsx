import { ButtonLink } from "../../../components/ui/Button/Button";
import styles from "./HomepageSections.module.scss";
import { useEffect, useState } from "react";
import { getHomepageGrowthVariant, trackExperimentConversion, trackExperimentImpression } from "../../../services/analytics/experiments";

export function FragranceFinderSection() {
  const [variant] = useState(getHomepageGrowthVariant);
  useEffect(() => { trackExperimentImpression(variant); }, [variant]);
  return (
    <section aria-labelledby="fragrance-finder-title" className={styles.finderSection}>
      <div className={styles.finderInner}>
        <p className={styles.eyebrow}>A guided ritual</p>
        <h2 id="fragrance-finder-title">{variant === "finder-first" ? "Five questions. A more personal edit." : "Find the scent that feels like you"}</h2>
        <p>
          Follow mood, material and memory through a quiet edit of our
          collection.
        </p>
        <ButtonLink
          style={{
            backgroundColor: "var(--home-accent-dark)",
            color: "var(--home-button-text)",
          }}
          onClick={() => trackExperimentConversion(variant)}
          to="/scent-finder"
        >
          Find your scent
        </ButtonLink>
      </div>
    </section>
  );
}
