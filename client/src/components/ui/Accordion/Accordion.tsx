import styles from "./Accordion.module.scss";

type AccordionProps = {
  className?: string;
};

export function Accordion({ className }: AccordionProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Accordion
    </div>
  );
}
