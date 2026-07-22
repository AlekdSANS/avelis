import styles from "./CartDrawer.module.scss";

type CartDrawerProps = {
  className?: string;
};

export function CartDrawer({ className }: CartDrawerProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      CartDrawer
    </div>
  );
}
