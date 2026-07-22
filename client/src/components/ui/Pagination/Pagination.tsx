import styles from "./Pagination.module.scss";

type PaginationProps = {
  className?: string;
};

export function Pagination({ className }: PaginationProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Pagination
    </div>
  );
}
