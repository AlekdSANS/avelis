import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function BrandIntroduction() {
  return (
    <section
      aria-labelledby="brand-introduction-title"
      className={styles.introduction}
    >
      <div className={styles.sectionLabel}>
        <p className={styles.eyebrow}>The house</p>
        <span aria-hidden="true">01</span>
      </div>

      <div className={styles.introductionCopy}>
        <h2 id="brand-introduction-title">A world composed in scent</h2>
        <div className={styles.introductionColumns}>
          <p>
            AVELIS is a fictional luxury fragrance house built around the idea
            that perfume can be both an atmosphere and an object. Each fragrance
            is composed as a distinct world, expressed through scent, material
            and sculptural form.
          </p>
          <p>
            The experience begins with character rather than convention: the
            quality of light, the temperature of a room, the texture of wood or
            a flower opening. Those impressions guide both the fragrance and
            the object that holds it.
          </p>
        </div>
      </div>

      <blockquote className={styles.brandStatement}>
        A fragrance should create a place around the person wearing it.
      </blockquote>
    </section>
  );
}
