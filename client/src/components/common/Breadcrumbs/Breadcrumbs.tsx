import styles from "./Breadcrumbs.module.scss";

type BreadcrumbsProps = {
  className?: string;
};

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Breadcrumbs
    </div>
  );
}
