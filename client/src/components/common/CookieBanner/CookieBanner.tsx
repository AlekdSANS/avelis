import styles from "./CookieBanner.module.scss";

type CookieBannerProps = {
  className?: string;
};

export function CookieBanner({ className }: CookieBannerProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      CookieBanner
    </div>
  );
}
