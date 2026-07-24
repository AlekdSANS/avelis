import styles from "./Pagination.module.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  ariaLabel?: string;
  className?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([
    1,
    totalPages,
    Math.max(2, currentPage - 1),
    Math.min(totalPages - 1, currentPage),
    Math.min(totalPages - 1, currentPage + 1),
  ]);
  const sortedPages = [...pages].sort((left, right) => left - right);
  const items: PaginationItem[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage !== undefined && page - previousPage > 1) {
      items.push(previousPage === 1 ? "ellipsis-start" : "ellipsis-end");
    }

    items.push(page);
  });

  return items;
}

export function Pagination({
  ariaLabel = "Pagination",
  className,
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const paginationItems = getPaginationItems(safeCurrentPage, totalPages);

  return (
    <nav
      aria-label={ariaLabel}
      className={[styles.pagination, className ?? ""].filter(Boolean).join(" ")}
    >
      <button
        aria-label="Go to previous page"
        disabled={safeCurrentPage === 1}
        onClick={() => onPageChange(safeCurrentPage - 1)}
        type="button"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      {paginationItems.map((item) =>
        typeof item === "number" ? (
          <button
            aria-current={item === safeCurrentPage ? "page" : undefined}
            aria-label={`Go to page ${item}`}
            key={item}
            onClick={() => onPageChange(item)}
            type="button"
          >
            {item}
          </button>
        ) : (
          <span aria-hidden="true" key={item}>
            …
          </span>
        ),
      )}
      <button
        aria-label="Go to next page"
        disabled={safeCurrentPage === totalPages}
        onClick={() => onPageChange(safeCurrentPage + 1)}
        type="button"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
