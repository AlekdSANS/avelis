import styles from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  className?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export function Pagination({
  className,
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Product catalogue pages"
      className={[styles.pagination, className ?? ""].filter(Boolean).join(" ")}
    >
      <button
        aria-label="Go to previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`Go to page ${page}`}
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        aria-label="Go to next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
