import styles from "./Breadcrumbs.module.scss";

type BreadcrumbsProps = {
  className?: string;
};

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Breadcrumbs
    </div>
  );
}
