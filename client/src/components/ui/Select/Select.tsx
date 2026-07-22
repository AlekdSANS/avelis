import styles from "./Select.module.scss";

type SelectProps = {
  className?: string;
};

export function Select({ className }: SelectProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Select
    </div>
  );
}
