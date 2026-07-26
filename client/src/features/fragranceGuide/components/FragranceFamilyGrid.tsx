import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import type { Product } from "../../../types/product";
import {
  getAvailableGuideFamilies,
  getFamilyNotes,
} from "../utils/guideCatalogue";
import { buildGuideShopHref } from "../utils/shopLinks";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

type FragranceFamilyGridProps = {
  products: Product[];
  status: "loading" | "error" | "ready";
};

export function FragranceFamilyGrid({
  products,
  status,
}: FragranceFamilyGridProps) {
  const families = getAvailableGuideFamilies(products);

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

        {status === "loading" ? (
          <div
            aria-busy="true"
            aria-label="Loading fragrance families"
            className={styles.familyGrid}
          >
            {Array.from({ length: 4 }, (_, index) => (
              <div className={styles.familySkeleton} key={index}>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.familyGrid}>
          {families.map((family, index) => {
            const notes = getFamilyNotes(products, family.name);

            return (
            <article className={styles.familyCard} key={family.name}>
              <div className={styles.familyCardTop}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{family.character}</p>
              </div>
              <h3>{family.name}</h3>
              <p className={styles.familyDescription}>{family.description}</p>
              <dl>
                {notes.length > 0 ? (
                  <div>
                    <dt>Notes in the catalogue</dt>
                    <dd>
                      <ul className={styles.familyNotes}>
                        {notes.map((note) => (
                          <li key={note.name}>{note.label}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ) : null}
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
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
}
