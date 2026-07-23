import styles from "./Accordion.module.scss";
import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import type { ReactNode } from "react";

type AccordionProps = {
  className?: string;
  defaultOpenIds?: string[];
  items: {
    content: ReactNode;
    id: string;
    title: string;
  }[];
};

export function Accordion({
  className,
  defaultOpenIds = [],
  items,
}: AccordionProps) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={[styles.accordion, className ?? ""].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <section className={styles.item} key={item.id}>
            <h3>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                id={buttonId}
                onClick={() => toggle(item.id)}
                type="button"
              >
                <span>{item.title}</span>
                <ChevronDown aria-hidden="true" />
              </button>
            </h3>
            <div
              aria-labelledby={buttonId}
              className={[styles.panel, isOpen ? styles.open : ""]
                .filter(Boolean)
                .join(" ")}
              id={panelId}
              role="region"
            >
              <div>
                <div className={styles.panelContent}>{item.content}</div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
