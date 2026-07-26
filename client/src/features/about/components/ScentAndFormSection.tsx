import { scentAndFormSteps } from "../data/aboutContent";
import styles from "../../../pages/AboutPage/AboutPage.module.scss";

export function ScentAndFormSection() {
  return (
    <section
      aria-labelledby="scent-form-title"
      className={styles.scentAndForm}
    >
      <header className={styles.philosophyHeader}>
        <p className={styles.eyebrow}>Fragrance and form</p>
        <h2 id="scent-form-title">The scent and the object belong together</h2>
        <p>
          One idea moves through the full composition, from the atmosphere that
          begins it to the form that makes it visible.
        </p>
      </header>

      <ol className={styles.philosophySteps}>
        {scentAndFormSteps.map((step) => (
          <li key={step.title}>
            <span aria-hidden="true">{step.index}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
