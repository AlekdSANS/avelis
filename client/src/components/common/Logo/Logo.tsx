import styles from "./Logo.module.scss";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      Logo
    </div>
  );
}
