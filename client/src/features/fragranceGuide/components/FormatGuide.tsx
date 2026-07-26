import { ArrowRight } from "lucide-react";

import { ButtonLink } from "../../../components/ui/Button/Button";
import { formatGuideItems } from "../data/fragranceGuideContent";
import { buildGuideShopHref } from "../utils/shopLinks";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function FormatGuide() {
  return (
    <section
      aria-labelledby="format-guide-title"
      className={[styles.section, styles.formatSection].join(" ")}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="Choose the complete presentation when discovering a fragrance, then return to the same composition through its dedicated refill."
          eyebrow="One fragrance, two formats"
          heading="Bottle or refill"
          id="format-guide-title"
        />

        <div className={styles.formatGrid}>
          {formatGuideItems.map((item, index) => (
            <article className={styles.formatCard} key={item.format}>
              <div aria-hidden="true" className={styles.formatMark}>
                <span>{index === 0 ? "A" : "R"}</span>
              </div>
              <div>
                <p className={styles.eyebrow}>{item.eyebrow}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p className={styles.formatDetail}>{item.detail}</p>
                <ButtonLink
                  to={buildGuideShopHref({ format: item.format })}
                  variant={index === 0 ? "primary" : "secondary"}
                >
                  {item.action}
                  <ArrowRight aria-hidden="true" />
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
