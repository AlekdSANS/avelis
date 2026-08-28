import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Skeleton } from "../../../components/ui/Skeleton/Skeleton";
import type { Product } from "../../../types/product";
import type { GuideFamilyName } from "../data/fragranceGuideContent";
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

const familyArtwork: Record<
  GuideFamilyName,
  { position: string; src: string }
> = {
  Woody: {
    src: "/images/fragrance-guide/families/woody.jpg",
    position: "center",
  },
  Floral: {
    src: "/images/fragrance-guide/families/floral.jpg",
    position: "center 42%",
  },
  Amber: {
    src: "/images/fragrance-guide/families/amber.jpg",
    position: "center",
  },
  Fresh: {
    src: "/images/fragrance-guide/families/fresh.jpg",
    position: "62% center",
  },
  Spicy: {
    src: "/images/fragrance-guide/families/spicy.jpg",
    position: "58% center",
  },
  Gourmand: {
    src: "/images/fragrance-guide/families/gourmand.jpg",
    position: "center",
  },
  Aquatic: {
    src: "/images/fragrance-guide/families/aquatic.jpg",
    position: "center",
  },
  Powdery: {
    src: "/images/fragrance-guide/families/powdery.jpg",
    position: "center 35%",
  },
};

export function FragranceFamilyGrid({
  products,
  status,
}: FragranceFamilyGridProps) {
  const families = getAvailableGuideFamilies();

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
              const artwork = familyArtwork[family.name];

              return (
                <article className={styles.familyCard} key={family.name}>
                  <div
                    aria-hidden="true"
                    className={styles.familyCardBackdrop}
                    style={{
                      backgroundImage: `url(${artwork.src})`,
                      backgroundPosition: artwork.position,
                    }}
                  />
                  <div className={styles.familyCardContent}>
                    <div className={styles.familyCardTop}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{family.character}</p>
                    </div>
                    <h3>{family.name}</h3>
                    <p className={styles.familyDescription}>
                      {family.description}
                    </p>
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
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
