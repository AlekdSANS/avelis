import styles from "./Header.module.scss";

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Header
    </div>
  );
}
