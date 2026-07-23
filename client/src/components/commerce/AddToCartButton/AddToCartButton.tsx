import styles from "./AddToCartButton.module.scss";
import { ShoppingBag } from "lucide-react";

import { Button } from "../../ui/Button/Button";

type AddToCartButtonProps = {
  className?: string;
  disabled?: boolean;
  onAdd: () => void;
  statusMessage?: string;
};

export function AddToCartButton({
  className,
  disabled = false,
  onAdd,
  statusMessage,
}: AddToCartButtonProps) {
  return (
    <div className={[styles.add, className ?? ""].filter(Boolean).join(" ")}>
      <Button disabled={disabled} fullWidth onClick={onAdd}>
        <ShoppingBag aria-hidden="true" />
        Add to Bag
      </Button>
      <p aria-live="polite">
        {statusMessage ?? "Local preview only — checkout persistence is not connected."}
      </p>
    </div>
  );
}
