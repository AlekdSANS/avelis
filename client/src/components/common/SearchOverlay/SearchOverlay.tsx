import styles from "./SearchOverlay.module.scss";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { IconButton } from "../../ui/IconButton/IconButton";
import { usePresence } from "../../../hooks/usePresence";

type SearchOverlayProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function SearchOverlay({
  className,
  isOpen,
  onClose,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const { isClosing, isMounted } = usePresence(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null;
  }

  const classes = [
    styles.overlay,
    isClosing ? styles.closing : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby="search-overlay-title"
      aria-modal="true"
      className={classes}
      role="dialog"
    >
      <button
        aria-label="Close search"
        className={styles.backdrop}
        onClick={onClose}
        type="button"
      />
      <div className={styles.panel}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Search AVELIS</p>
          <IconButton aria-label="Close search" onClick={onClose}>
            <X />
          </IconButton>
        </div>

        <form className={styles.form} role="search">
          <label className="visually-hidden" htmlFor="storefront-search">
            Search fragrances, notes or collections
          </label>
          <Search aria-hidden="true" />
          <input
            autoComplete="off"
            id="storefront-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search fragrances, notes or collections"
            ref={inputRef}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="Clear search"
              className={styles.clearButton}
              onClick={() => setQuery("")}
              type="button"
            >
              Clear
            </button>
          ) : null}
        </form>

        <div aria-live="polite" className={styles.emptyState}>
          <h2 id="search-overlay-title">Find your next composition</h2>
          <p>
            Search results will appear here once fragrance search is connected.
          </p>
        </div>
      </div>
    </section>
  );
}
