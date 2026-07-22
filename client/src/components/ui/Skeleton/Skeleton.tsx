import styles from "./Skeleton.module.scss";

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Skeleton
    </div>
  );
}
