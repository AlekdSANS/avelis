import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { scentCharacters } from "../data/fragranceGuideContent";
import { buildGuideShopHref } from "../utils/shopLinks";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function ScentCharacterGrid() {
  return (
    <section
      aria-labelledby="scent-character-title"
      className={styles.section}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="There is no fixed rule for where or when to wear a fragrance. Start with the atmosphere you want nearby and follow what feels natural."
          eyebrow="A simple way to choose"
          heading="Find your scent by character"
          id="scent-character-title"
        />

        <div className={styles.characterGrid}>
          {scentCharacters.map((character, index) => (
            <Link
              className={styles.characterCard}
              key={character.name}
              to={buildGuideShopHref(character.filter)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{character.name}</h3>
              <p>{character.description}</p>
              <strong>
                {character.action}
                <ArrowUpRight aria-hidden="true" />
              </strong>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
