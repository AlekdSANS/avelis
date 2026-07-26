import { noteLayers } from "../data/fragranceGuideContent";
import { GuideSectionHeading } from "./GuideSectionHeading";
import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

export function NotesGuide() {
  return (
    <section
      aria-labelledby="notes-guide-title"
      className={[styles.section, styles.notesSection].join(" ")}
    >
      <div className={styles.inner}>
        <GuideSectionHeading
          description="A perfume is not static. Its materials become more or less noticeable over time, creating an opening, a centre and a lasting foundation."
          eyebrow="How perfume unfolds"
          heading="Understanding fragrance notes"
          id="notes-guide-title"
        />

        <ol aria-label="The three stages of a fragrance" className={styles.noteTimeline}>
          {noteLayers.map((layer) => (
            <li key={layer.key}>
              <span className={styles.noteIndex}>{layer.index}</span>
              <div>
                <p>{layer.timing}</p>
                <h3>{layer.name}</h3>
              </div>
              <p className={styles.noteDescription}>{layer.description}</p>
            </li>
          ))}
        </ol>

        <p className={styles.guideAside}>
          These layers overlap rather than changing at a fixed moment. Skin,
          climate and the composition itself all influence what you notice.
        </p>
      </div>
    </section>
  );
}
