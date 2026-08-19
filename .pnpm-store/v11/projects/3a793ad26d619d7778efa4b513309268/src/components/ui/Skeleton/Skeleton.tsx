import styles from "./Skeleton.module.scss";
import type { HTMLAttributes } from "react";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
};

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={[styles.skeleton, className ?? ""].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
