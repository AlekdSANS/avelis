import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  showDescriptor?: boolean;
};

export function Logo({ className, showDescriptor = false }: LogoProps) {
  const classes = [styles.logo, className ?? ""].filter(Boolean).join(" ");

  return (
    <Link aria-label="AVELIS home" className={classes} to="/">
      <span aria-hidden="true" className={styles.mark}>
        <span />
        <span />
        <span />
      </span>
      <span className={styles.wordmark}>
        AVELIS
        {showDescriptor ? <span>PARFUMS</span> : null}
      </span>
    </Link>
  );
}
