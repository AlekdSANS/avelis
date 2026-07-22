import styles from "./AddToCartButton.module.scss";

type AddToCartButtonProps = {
  className?: string;
};

export function AddToCartButton({ className }: AddToCartButtonProps) {
  return (
    <div className={` ${className ?? ""}`.trim()}>
      AddToCartButton
    </div>
  );
}
