import styles from "../../../pages/FragranceGuidePage/FragranceGuidePage.module.scss";

type GuideSectionHeadingProps = {
  description: string;
  eyebrow: string;
  heading: string;
  id: string;
};

export function GuideSectionHeading({
  description,
  eyebrow,
  heading,
  id,
}: GuideSectionHeadingProps) {
  return (
    <header className={styles.sectionHeading}>
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id}>{heading}</h2>
      </div>
      <p className={styles.sectionIntro}>{description}</p>
    </header>
  );
}
