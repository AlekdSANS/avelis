import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  className?: string;
};

export function ProductCard({ className }: ProductCardProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      ProductCard
    </div>
  );
}
