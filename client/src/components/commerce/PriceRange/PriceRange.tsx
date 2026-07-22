import styles from "./PriceRange.module.scss";

type PriceRangeProps = {
  className?: string;
};

export function PriceRange({ className }: PriceRangeProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      PriceRange
    </div>
  );
}
