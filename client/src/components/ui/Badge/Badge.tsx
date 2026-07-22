import styles from "./Badge.module.scss";

type BadgeProps = {
  className?: string;
};

export function Badge({ className }: BadgeProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Badge
    </div>
  );
}
