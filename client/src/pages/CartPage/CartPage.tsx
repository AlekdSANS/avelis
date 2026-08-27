import styles from "./CartPage.module.scss";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import { ButtonLink } from "../../components/ui/Button/Button";
import { Price } from "../../components/ui/Price/Price";
import { useCart } from "../../features/cart/hooks/useCart";
import { createCheckoutSummaryLines } from "../../features/checkout/utils/cartSummary";
import { ProductImage } from "../../features/products/components/ProductImage";
import { trackViewCart } from "../../services/analytics";

export function CartPage() {
  const cart = useCart();
  const location = useLocation();
  const lines = createCheckoutSummaryLines(cart.items);
  const trackedLocationKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      cart.hasHydrated &&
      trackedLocationKeyRef.current !== location.key
    ) {
      trackViewCart(cart.items, `${location.key}:page`);
      trackedLocationKeyRef.current = location.key;
    }
  }, [cart.hasHydrated, cart.items, location.key]);

  if (!cart.hasHydrated) {
    return (
      <section aria-busy="true" className={styles.page}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Your selection</p>
          <h1>Shopping Bag</h1>
          <p>Preparing your saved selection...</p>
        </header>
        <div className={styles.loading} role="status">
          <span className={styles.visuallyHidden}>Preparing shopping bag</span>
        </div>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className={styles.emptyState}>
        <ShoppingBag aria-hidden="true" />
        <p className={styles.eyebrow}>Your selection</p>
        <h1>Your shopping bag is quiet for now.</h1>
        <p>
          Discover a composition and return when your selection feels
          complete.
        </p>
        <ButtonLink to="/shop">Explore fragrances</ButtonLink>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      <header className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Your selection</p>
          <h1>Shopping Bag</h1>
        </div>
        <p aria-live="polite" className={styles.itemCount}>
          {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"}
        </p>
      </header>

      <div className={styles.layout}>
        <section aria-labelledby="bag-items-title" className={styles.bag}>
          <h2 className={styles.visuallyHidden} id="bag-items-title">
            Items in your shopping bag
          </h2>
          <ul className={styles.items}>
            {lines.map((line) => {
              const cartItem = cart.items.find((item) => item.id === line.id);
              const stock = cartItem?.variant.stock ?? 0;

              return (
                <li className={styles.item} key={line.id}>
                  <Link
                    aria-label={`View ${line.productName}`}
                    className={styles.imageLink}
                    to={`/products/${line.productSlug}`}
                  >
                    <ProductImage
                      alt={line.imageAlt}
                      className={styles.itemImage}
                      src={line.imageUrl}
                    />
                  </Link>

                  <div className={styles.itemDetails}>
                    <div className={styles.itemHeading}>
                      <div>
                        <Link to={`/products/${line.productSlug}`}>
                          {line.productName}
                        </Link>
                        <p>
                          {line.format === "BOTTLE" ? "Bottle" : "Refill"} ·{" "}
                          {line.volumeMl} ml
                        </p>
                      </div>
                      <button
                        aria-label={`Remove ${line.productName} from bag`}
                        className={styles.removeButton}
                        onClick={() => cart.removeItem(line.id)}
                        title="Remove from bag"
                        type="button"
                      >
                        <Trash2 aria-hidden="true" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <div className={styles.itemControls}>
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
                            disabled={
                              Number.isFinite(stock) && line.quantity >= stock
                            }
                            onClick={() =>
                              cart.updateQuantity(line.id, line.quantity + 1)
                            }
                            type="button"
                          >
                            <Plus aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className={styles.linePrice}>
                        <span className={styles.controlLabel}>Total</span>
                        <strong>
                          <Price value={line.lineTotalCents / 100} />
                        </strong>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link className={styles.continueShopping} to="/shop">
            Continue shopping
          </Link>
        </section>

        <aside aria-labelledby="order-summary-title" className={styles.summary}>
          <p className={styles.eyebrow}>Order overview</p>
          <h2 id="order-summary-title">Summary</h2>
          <div className={styles.subtotal}>
            <span>Subtotal</span>
            <strong>
              <Price value={cart.subtotalCents / 100} />
            </strong>
          </div>
          <p className={styles.deliveryNote}>
            Delivery and taxes will be calculated at checkout.
          </p>
          <ButtonLink fullWidth to="/checkout">
            Checkout
          </ButtonLink>
          <p className={styles.assurance}>
            Your bag is saved on this device while you continue browsing.
          </p>
        </aside>
      </div>
    </section>
  );
}
