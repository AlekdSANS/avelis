import { brandPrinciples } from "../data/aboutContent";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function BrandPrinciples() {
  return (
    <section aria-labelledby="principles-title" className={styles.principles}>
      <header className={styles.principlesHeader}>
        <p className={styles.eyebrow}>Principles</p>
        <h2 id="principles-title">A quieter measure of luxury</h2>
      </header>

      <ol className={styles.principlesList}>
        {brandPrinciples.map((principle, index) => (
          <li key={principle.title}>
            <span aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
