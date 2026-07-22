import styles from "./Footer.module.scss";

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Footer
    </div>
  );
}
