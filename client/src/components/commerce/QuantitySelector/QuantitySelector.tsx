import styles from "./QuantitySelector.module.scss";

type QuantitySelectorProps = {
  className?: string;
};

export function QuantitySelector({ className }: QuantitySelectorProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      QuantitySelector
    </div>
  );
}
