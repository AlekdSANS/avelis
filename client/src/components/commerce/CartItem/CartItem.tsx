import styles from "./CartItem.module.scss";

type CartItemProps = {
  className?: string;
};

export function CartItem({ className }: CartItemProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      CartItem
    </div>
  );
}
