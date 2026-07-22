import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  className?: string;
};

export function ProductGrid({ className }: ProductGridProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      ProductGrid
    </div>
  );
}
