import styles from "./CheckoutPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import { Button, ButtonLink } from "../../components/ui/Button/Button";
import { useCurrentUser } from "../../features/auth/hooks/useAuth";
import { useCart } from "../../features/cart/hooks/useCart";
import { CustomerDetailsSection } from "../../features/checkout/components/CustomerDetailsSection";
import { CheckoutSummary } from "../../features/checkout/components/CheckoutSummary";
import { PaymentMethodSection } from "../../features/checkout/components/PaymentMethodSection";
import { ShippingAddressSection } from "../../features/checkout/components/ShippingAddressSection";
import { ShippingMethodSection } from "../../features/checkout/components/ShippingMethodSection";
import {
  checkoutDefaultValues,
  type CheckoutFormValues,
  type FutureOrderPayload,
} from "../../features/checkout/types";
import { checkoutSchema } from "../../features/checkout/schemas/checkoutSchema";
import { createCheckoutSummaryLines } from "../../features/checkout/utils/cartSummary";
import {
  createCheckoutIdempotencyKey,
  createOrderPayload,
} from "../../features/checkout/utils/createOrderPayload";

export function CheckoutPage() {
  const cart = useCart();
  const currentUser = useCurrentUser();
  const prefilledUserIdRef = useRef<string | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const preparedPayloadRef = useRef<FutureOrderPayload | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [preparationMessage, setPreparationMessage] = useState<string | null>(
    null,
  );
  const form = useForm<CheckoutFormValues>({
    defaultValues: checkoutDefaultValues,
    mode: "onBlur",
    resolver: zodResolver(checkoutSchema),
    shouldFocusError: true,
  });
  const {
    formState: { isSubmitting },
    getFieldState,
    getValues,
    setValue,
  } = form;

  useEffect(() => {
    const user = currentUser.data;

    if (user === null || user === undefined || prefilledUserIdRef.current === user.id) {
      return;
    }

    const prefillField = (
      name: "customer.firstName" | "customer.lastName" | "customer.email",
      value: string,
    ) => {
      const currentValue = getValues(name);
      const fieldState = getFieldState(name);

      if (!fieldState.isDirty && currentValue.trim().length === 0) {
        setValue(name, value, {
          shouldDirty: false,
          shouldTouch: false,
          shouldValidate: false,
        });
      }
    };

    prefillField("customer.firstName", user.firstName);
    prefillField("customer.lastName", user.lastName);
    prefillField("customer.email", user.email);
    prefilledUserIdRef.current = user.id;
  }, [currentUser.data, getFieldState, getValues, setValue]);

  const onSubmit = async (values: CheckoutFormValues) => {
    setCheckoutError(null);
    setPreparationMessage(null);

    const usableItems = createCheckoutSummaryLines(cart.items);

    if (usableItems.length === 0 || usableItems.length !== cart.items.length) {
      setCheckoutError(
        "We could not prepare checkout because some cart information is unavailable. Review your bag and try again.",
      );
      return;
    }

    idempotencyKeyRef.current ??= createCheckoutIdempotencyKey();
    preparedPayloadRef.current = createOrderPayload(
      values,
      cart.items,
      idempotencyKeyRef.current,
    );

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 250);
    });

    setPreparationMessage(
      "Checkout details are ready. Order submission will be connected in the next implementation step.",
    );
  };

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
        <p aria-live="polite" className={styles.prefillStatus}>
          {currentUser.isLoading
            ? "Checking saved account details…"
            : currentUser.isError
              ? "Saved account details could not be loaded. You can continue as a guest."
              : currentUser.data
                ? "Your account details were added where fields were still empty."
                : "Guest checkout is available."}
        </p>
      </header>

      <FormProvider {...form}>
        <form
          className={styles.layout}
          noValidate
          onChange={() => {
            setCheckoutError(null);
            setPreparationMessage(null);
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={styles.formColumn} aria-label="Checkout details">
            <CustomerDetailsSection />
            <ShippingAddressSection />
            <ShippingMethodSection />
            <PaymentMethodSection />
            <section
              aria-labelledby="checkout-submit-title"
              className={styles.submitSection}
            >
              <div>
                <p className={styles.eyebrow}>Final review</p>
                <h2 id="checkout-submit-title">Ready when you are</h2>
              </div>

              {checkoutError ? (
                <p className={styles.checkoutError} role="alert">
                  {checkoutError}
                </p>
              ) : null}

              {preparationMessage ? (
                <p
                  aria-live="polite"
                  className={styles.preparationMessage}
                  role="status"
                >
                  {preparationMessage}
                </p>
              ) : null}

              <Button
                disabled={
                  isSubmitting ||
                  !cart.hasHydrated ||
                  cart.items.length === 0
                }
                fullWidth
                type="submit"
              >
                <LockKeyhole aria-hidden="true" />
                {isSubmitting ? "Placing order..." : "Place order"}
              </Button>
              <p className={styles.submitNote}>
                This step validates and prepares your details only. It does not
                create an order, process payment, or clear your cart.
              </p>
            </section>
          </div>
          <CheckoutSummary />
        </form>
      </FormProvider>
    </main>
  );
}
