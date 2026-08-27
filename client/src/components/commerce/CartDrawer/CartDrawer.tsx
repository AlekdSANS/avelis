import styles from "./CartDrawer.module.scss";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { ButtonLink } from "../../ui/Button/Button";
import { IconButton } from "../../ui/IconButton/IconButton";
import { Price } from "../../ui/Price/Price";
import { useCart } from "../../../features/cart/hooks/useCart";
import { createCheckoutSummaryLines } from "../../../features/checkout/utils/cartSummary";
import { ProductImage } from "../../../features/products/components/ProductImage";
import { usePresence } from "../../../hooks/usePresence";
import { trackViewCart } from "../../../services/analytics";

type CartDrawerProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ className, isOpen, onClose }: CartDrawerProps) {
  const { isClosing, isMounted } = usePresence(isOpen);
  const location = useLocation();
  const cart = useCart();
  const lines = createCheckoutSummaryLines(cart.items);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openCountRef = useRef(0);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpenRef.current) {
      openCountRef.current += 1;
      trackViewCart(
        cart.items,
        `${location.key}:drawer:${openCountRef.current}`,
      );
    }
    wasOpenRef.current = isOpen;
  }, [cart.items, isOpen, location.key]);

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

        {lines.length === 0 ? (
          <div className={styles.emptyState}>
            <ShoppingBag aria-hidden="true" />
            <h3>Your bag is quiet for now</h3>
            <p>Choose a fragrance to begin your selection.</p>
          </div>
        ) : (
          <ul aria-label="Cart items" className={styles.items}>
            {lines.map((line) => (
              <li className={styles.item} key={line.id}>
                <ProductImage
                  alt={line.imageAlt}
                  className={styles.itemImage}
                  src={line.imageUrl}
                />
                <div className={styles.itemCopy}>
                  <div className={styles.itemHeader}>
                    <Link onClick={onClose} to={`/products/${line.productSlug}`}>
                      {line.productName}
                    </Link>
                    <button
                      aria-label={`Remove ${line.productName} from bag`}
                      className={styles.removeButton}
                      onClick={() => cart.removeItem(line.id)}
                      title="Remove from bag"
                      type="button"
                    >
                      <Trash2 aria-hidden="true" />
                    </button>
                  </div>
                  <span className={styles.itemMeta}>
                    {line.format === "BOTTLE" ? "Bottle" : "Refill"} ·{" "}
                    {line.volumeMl} ml
                  </span>
                  <div className={styles.itemFooter}>
                    <div className={styles.quantityBlock}>
                      <span className={styles.controlLabel}>Quantity</span>
                      <div
                        aria-label={`Quantity for ${line.productName}`}
                        className={styles.quantityControl}
                        role="group"
                      >
                        <button
                          aria-label={`Decrease ${line.productName} quantity`}
                          disabled={line.quantity <= 1}
                          onClick={() =>
                            cart.updateQuantity(line.id, line.quantity - 1)
                          }
                          type="button"
                        >
                          <Minus aria-hidden="true" />
                        </button>
                        <span aria-live="polite">{line.quantity}</span>
                        <button
                          aria-label={`Increase ${line.productName} quantity`}
                          onClick={() =>
                            cart.updateQuantity(line.id, line.quantity + 1)
                          }
                          type="button"
                        >
                          <Plus aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className={styles.priceBlock}>
                      <span className={styles.controlLabel}>Total</span>
                      <strong className={styles.itemPrice}>
                        <Price value={line.lineTotalCents / 100} />
                      </strong>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.summary}>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <strong>
              <Price value={cart.subtotalCents / 100} />
            </strong>
          </div>
          <p>Delivery and taxes will be calculated at checkout.</p>
          <Link className={styles.viewBag} onClick={onClose} to="/cart">
            View bag
          </Link>
          <ButtonLink
            fullWidth
            onClick={onClose}
            to={lines.length === 0 ? "/shop" : "/checkout"}
          >
            {lines.length === 0 ? "Explore fragrances" : "Checkout"}
          </ButtonLink>
        </div>
      </aside>
    </section>
  );
}
