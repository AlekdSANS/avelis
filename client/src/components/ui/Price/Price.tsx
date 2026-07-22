import styles from "./Price.module.scss";

type PriceProps = {
  className?: string;
};

export function Price({ className }: PriceProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Price
    </div>
  );
}
