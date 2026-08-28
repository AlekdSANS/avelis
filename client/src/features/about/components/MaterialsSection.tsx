import { materialDetails } from "../data/aboutContent";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";
import { CollectionImage } from "../../collections/components/CollectionImage";

export function MaterialsSection() {
  return (
    <section aria-labelledby="materials-title" className={styles.materials}>
      <div className={styles.materialMedia}>
        <CollectionImage
          alt="A translucent blue perfume bottle set against magnolia branches and pale weathered wood"
          height="941"
          loading="lazy"
          src="/images/hero/home_hero_frost.png"
          width="1672"
        />
        <p aria-hidden="true">Glass · wood · bloom · mineral light</p>
      </div>

      <div className={styles.materialCopy}>
        <p className={styles.eyebrow}>Material language</p>
        <h2 id="materials-title">Materials that hold an atmosphere</h2>
        <p className={styles.materialIntroduction}>
          The AVELIS visual direction pairs softened glass, organic line and
          natural references. These are design cues rather than claims about a
          particular manufacturing process: a language for making an invisible
          fragrance feel tangible.
        </p>

        <dl className={styles.materialList}>
          {materialDetails.map((material) => (
            <div key={material.title}>
              <dt>{material.title}</dt>
              <dd>{material.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
