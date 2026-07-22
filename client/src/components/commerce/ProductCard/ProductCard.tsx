import styles from "./ProductCard.module.scss";

type ProductCardProps = {
  className?: string;
};

export function ProductCard({ className }: ProductCardProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      ProductCard
    </div>
  );
}
