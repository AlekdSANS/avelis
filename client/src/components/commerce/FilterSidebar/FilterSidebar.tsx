import styles from "./FilterSidebar.module.scss";

type FilterSidebarProps = {
  className?: string;
};

export function FilterSidebar({ className }: FilterSidebarProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      FilterSidebar
    </div>
  );
}
