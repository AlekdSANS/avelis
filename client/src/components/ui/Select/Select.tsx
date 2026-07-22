import styles from "./Select.module.scss";

type SelectProps = {
  className?: string;
};

export function Select({ className }: SelectProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Select
    </div>
  );
}
