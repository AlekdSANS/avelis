import styles from "./Accordion.module.scss";

type AccordionProps = {
  className?: string;
};

export function Accordion({ className }: AccordionProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Accordion
    </div>
  );
}
