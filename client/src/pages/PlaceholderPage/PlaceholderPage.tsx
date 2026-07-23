import styles from "../../app/router.module.scss";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className={styles.placeholderPage}>
      <p className={styles.eyebrow}>Storefront foundation</p>
      <h1>{title}</h1>
      <p>This route is ready for its permanent page content in a later pass.</p>
    </section>
  );
}
