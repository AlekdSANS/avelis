import styles from "./ReviewCard.module.scss";

type ReviewCardProps = {
  className?: string;
};

export function ReviewCard({ className }: ReviewCardProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      ReviewCard
    </div>
  );
}
