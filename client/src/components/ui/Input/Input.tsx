import styles from "./Input.module.scss";

type InputProps = {
  className?: string;
};

export function Input({ className }: InputProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Input
    </div>
  );
}
