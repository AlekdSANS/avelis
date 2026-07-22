import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  className?: string;
};

export function ProductGrid({ className }: ProductGridProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      ProductGrid
    </div>
  );
}
