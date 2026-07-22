import styles from "./FilterSidebar.module.scss";

type FilterSidebarProps = {
  className?: string;
};

export function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      FilterSidebar
    </div>
  );
}
