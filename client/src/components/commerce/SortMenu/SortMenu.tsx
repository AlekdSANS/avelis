import styles from "./SortMenu.module.scss";

type SortMenuProps = {
  className?: string;
};

export function SortMenu({ className }: SortMenuProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      SortMenu
    </div>
  );
}
