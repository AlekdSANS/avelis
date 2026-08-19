import styles from "./CartItem.module.scss";

type CartItemProps = {
  className?: string;
};

export function CartItem({ className }: CartItemProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      CartItem
    </div>
  );
}
