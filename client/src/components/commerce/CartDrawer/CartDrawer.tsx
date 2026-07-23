import styles from "./CartDrawer.module.scss";
import { ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { Button } from "../../ui/Button/Button";
import { IconButton } from "../../ui/IconButton/IconButton";
import { usePresence } from "../../../hooks/usePresence";

type CartDrawerProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ className, isOpen, onClose }: CartDrawerProps) {
  const { isClosing, isMounted } = usePresence(isOpen);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isMounted) {
    return null;
  }

  const classes = [styles.drawer, className ?? ""].filter(Boolean).join(" ");
  const layerClasses = [styles.layer, isClosing ? styles.closing : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-labelledby="cart-drawer-title"
      aria-modal="true"
      className={layerClasses}
      role="dialog"
    >
      <button
        aria-label="Close cart"
        className={styles.backdrop}
        onClick={onClose}
        type="button"
      />
      <aside className={classes}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Your selection</p>
            <h2 id="cart-drawer-title">Shopping Bag</h2>
          </div>
          <IconButton
            aria-label="Close cart"
            onClick={onClose}
            ref={closeButtonRef}
          >
            <X />
          </IconButton>
        </div>

        <div className={styles.emptyState}>
          <ShoppingBag aria-hidden="true" />
          <h3>Your bag is quiet for now</h3>
          <p>
            Cart items will appear here once the storefront is connected to cart
            data.
          </p>
        </div>

        <div className={styles.itemsSlot} aria-label="Cart item area" />

        <div className={styles.summary}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <strong>0.00 PLN</strong>
          </div>
          <p>Delivery and taxes will be calculated at checkout.</p>
          <Link className={styles.viewBag} onClick={onClose} to="/cart">
            View bag
          </Link>
          <Button fullWidth>Checkout</Button>
        </div>
      </aside>
    </section>
  );
}
