import styles from "./Price.module.scss";

type PriceProps = {
  className?: string;
};

export function Price({ className }: PriceProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Price
    </div>
  );
}
