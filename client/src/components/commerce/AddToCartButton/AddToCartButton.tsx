import styles from "./AddToCartButton.module.scss";

type AddToCartButtonProps = {
  className?: string;
};

export function AddToCartButton({ className }: AddToCartButtonProps) {
  return (
    <div className={[styles.root, className ?? ""].filter(Boolean).join(" ")}>
      AddToCartButton
    </div>
  );
}
