import styles from "./Spinner.module.scss";

type SpinnerProps = {
  className?: string;
};

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Spinner
    </div>
  );
}
