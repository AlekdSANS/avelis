import styles from "../../app/router.module.scss";
import { Link } from "react-router-dom";

type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className={styles.placeholderPage}>
      <p className={styles.eyebrow}>AVELIS</p>
      <h1>{title}</h1>
      <p>
        <Link to="/shop">Explore fragrances</Link>
        {" · "}
        <Link to="/collections">View collections</Link>
      </p>
    </section>
  );
}
