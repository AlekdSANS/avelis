import styles from "./IconButton.module.scss";

type IconButtonProps = {
  className?: string;
};

export function IconButton({ className }: IconButtonProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      IconButton
    </div>
  );
}
