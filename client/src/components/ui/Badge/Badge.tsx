import styles from "./Badge.module.scss";

type BadgeProps = {
  className?: string;
};

export function Badge({ className }: BadgeProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Badge
    </div>
  );
}
