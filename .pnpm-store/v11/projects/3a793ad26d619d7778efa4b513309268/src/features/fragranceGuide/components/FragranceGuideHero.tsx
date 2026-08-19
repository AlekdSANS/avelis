import { ArrowDown, ArrowRight } from "lucide-react";

import { Button, ButtonLink } from "../../../components/ui/Button/Button";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

function scrollToFamilies() {
  const target = document.getElementById("fragrance-families");
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  target?.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function FragranceGuideHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The AVELIS fragrance guide</p>
          <h1>A language written in scent</h1>
          <p className={styles.heroDescription}>
            Discover how fragrance families, notes and concentration shape the
            way a perfume unfolds on skin.
          </p>
          <div className={styles.heroActions}>
            <Button onClick={scrollToFamilies}>
              Explore fragrance families
              <ArrowDown aria-hidden="true" />
            </Button>
            <ButtonLink to="/shop" variant="secondary">
              Shop all fragrances
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <aside aria-label="This guide covers" className={styles.heroIndex}>
          <p>Inside the guide</p>
          <ol>
            <li>
              <span>01</span>
              Fragrance families
            </li>
            <li>
              <span>02</span>
              Notes and unfolding
            </li>
            <li>
              <span>03</span>
              Concentration
            </li>
            <li>
              <span>04</span>
              Bottle and refill
            </li>
          </ol>
        </aside>
      </div>
    </header>
  );
}
