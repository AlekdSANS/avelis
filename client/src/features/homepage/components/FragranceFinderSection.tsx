import { ButtonLink } from "../../../components/ui/Button/Button";
import styles from "./HomepageSections.module.scss";

export function FragranceFinderSection() {
  return (
    <section aria-labelledby="fragrance-finder-title" className={styles.finderSection}>
      <div className={styles.finderInner}>
        <p className={styles.eyebrow}>A guided ritual</p>
        <h2 id="fragrance-finder-title">Find the scent that feels like you</h2>
        <p>
          Follow mood, material and memory through a quiet edit of the AVELIS
          collection.
        </p>
        <ButtonLink
          style={{
            backgroundColor: "var(--home-accent-dark)",
            color: "var(--home-button-text)",
          }}
          to="/fragrance-guide"
        >
          Find your scent
        </ButtonLink>
      </div>
    </section>
  );
}
