import styles from "./Pagination.module.scss";

type PaginationProps = {
  className?: string;
};

export function Pagination({ className }: PaginationProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Pagination
    </div>
  );
}
