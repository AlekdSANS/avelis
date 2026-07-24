import styles from "./CheckoutPage.module.scss";
import { FormProvider, useForm } from "react-hook-form";

import { ButtonLink } from "../../components/ui/Button/Button";
import { useCart } from "../../features/cart/hooks/useCart";
import {
	checkoutDefaultValues,
	type CheckoutFormValues,
} from "../../features/checkout/types";

export function CheckoutPage() {
  const cart = useCart();
  const form = useForm<CheckoutFormValues>({
    defaultValues: checkoutDefaultValues,
    mode: "onBlur",
  });

  if (cart.hasHydrated && cart.items.length === 0) {
    return (
      <section className={styles.emptyState}>
        <p className={styles.eyebrow}>Your selection</p>
        <h1>Your cart is waiting for a fragrance.</h1>
        <p>
          Discover an AVELIS composition, then return here when your selection
          feels complete.
        </p>
        <ButtonLink to="/shop">Explore fragrances</ButtonLink>
      </section>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Secure checkout</p>
        <h1>Complete your selection</h1>
        <p>
          Your details stay editable until order submission is connected in the
          next implementation stage.
        </p>
      </header>

      <FormProvider {...form}>
        <form
          className={styles.layout}
          noValidate
          onSubmit={form.handleSubmit(() => undefined)}
        >
          <div className={styles.formColumn} aria-label="Checkout details" />
          <aside
            aria-labelledby="checkout-summary-title"
            className={styles.summary}
          >
            <h2 id="checkout-summary-title">Order summary</h2>
            <p>
              {cart.totalQuantity}{" "}
              {cart.totalQuantity === 1 ? "item" : "items"} selected
            </p>
          </aside>
        </form>
      </FormProvider>
    </main>
  );
}
