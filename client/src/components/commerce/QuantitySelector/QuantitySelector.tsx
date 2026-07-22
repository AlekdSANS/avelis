import styles from "./QuantitySelector.module.scss";

type QuantitySelectorProps = {
  className?: string;
};

export function QuantitySelector({ className }: QuantitySelectorProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      QuantitySelector
    </div>
  );
}
