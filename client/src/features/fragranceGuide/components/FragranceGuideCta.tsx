import { ArrowRight } from "lucide-react";

import { ButtonLink } from "../../../components/ui/Button/Button";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function FragranceGuideCta() {
  return (
    <aside className={styles.finalCta}>
      <div className={styles.finalCtaInner}>
        <p className={styles.eyebrow}>Continue the discovery</p>
        <h2>Find the scent that feels like yours</h2>
        <p>
          Explore the full AVELIS catalogue by family, notes, concentration and
          format.
        </p>
        <div>
          <ButtonLink to="/scent-finder">
            Take the scent finder
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to="/collections" variant="secondary">
            View collections
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
