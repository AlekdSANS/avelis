import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import type { HomepageTheme } from "../types";
import styles from "./HomepageSections.module.scss";

type BrandStorySectionProps = {
  theme: HomepageTheme;
};

export function BrandStorySection({ theme }: BrandStorySectionProps) {
  return (
    <section aria-labelledby="brand-story-title" className={styles.storySection}>
      <div className={styles.storyInner}>
        <div className={styles.storyImage}>
          <img
            alt={theme.storyImageAlt}
            loading="lazy"
            src={theme.storyImage}
          />
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.eyebrow}>Our approach</p>
          <h2 id="brand-story-title">Scent shaped by nature</h2>
          <p>
            AVELIS creates botanical fragrances through quiet materials,
            sculptural forms and modern European restraint. Each composition
            begins with atmosphere before becoming scent.
          </p>
          <Link className={styles.textLink} to="/about">
            Discover our story
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
