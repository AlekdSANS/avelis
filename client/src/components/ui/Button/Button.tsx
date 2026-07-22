import styles from "./Button.module.scss";

type ButtonProps = {
  className?: string;
};

export function Button({ className }: ButtonProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Button
    </div>
  );
}
