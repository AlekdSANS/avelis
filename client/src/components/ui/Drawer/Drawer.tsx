import styles from "./Drawer.module.scss";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { usePresence } from "../../../hooks/usePresence";
import { IconButton } from "../IconButton/IconButton";

type DrawerProps = {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  label?: string;
  onClose: () => void;
  title: string;
};

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({
  children,
  className,
  isOpen,
  label,
  onClose,
  title,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { isClosing, isMounted } = usePresence(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusable = [...panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)];
      const first = focusable[0];
      const last = focusable.at(-1);

      if (!first || !last) {
        event.preventDefault();
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <section
      aria-labelledby={titleId}
      aria-modal="true"
      className={[styles.layer, isClosing ? styles.closing : ""]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
    >
      <button
        aria-label={`Close ${title.toLocaleLowerCase()}`}
        className={styles.backdrop}
        onClick={onClose}
        type="button"
      />
      <aside
        className={[styles.drawer, className ?? ""].filter(Boolean).join(" ")}
        ref={panelRef}
      >
        <header className={styles.header}>
          <div>
            {label ? <p>{label}</p> : null}
            <h2 id={titleId}>{title}</h2>
          </div>
          <IconButton
            aria-label={`Close ${title.toLocaleLowerCase()}`}
            onClick={onClose}
            ref={closeRef}
          >
            <X />
          </IconButton>
        </header>
        <div className={styles.content}>{children}</div>
      </aside>
    </section>
  );
}
