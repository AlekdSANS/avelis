import styles from "./Input.module.scss";

type InputProps = {
  className?: string;
};

export function Input({ className }: InputProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      Input
    </div>
  );
}
