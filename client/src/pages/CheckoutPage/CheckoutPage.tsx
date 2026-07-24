import styles from "./CheckoutPage.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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
} from "../../features/checkout/types";
import { useCreateOrder } from "../../features/checkout/hooks/useCreateOrder";
import { checkoutSchema } from "../../features/checkout/schemas/checkoutSchema";
import { createCheckoutSummaryLines } from "../../features/checkout/utils/cartSummary";
import {
  createCheckoutIdempotencyKey,
  createOrderPayload,
} from "../../features/checkout/utils/createOrderPayload";
import {
  mapCreateOrderError,
  type CheckoutOrderError,
} from "../../features/checkout/utils/orderError";
import { onOrderCreationConfirmed } from "../../features/checkout/utils/orderSuccess";
import { orderKeys } from "../../features/orders/orderQueries";

export function CheckoutPage() {
  const cart = useCart();
  const currentUser = useCurrentUser();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const prefilledUserIdRef = useRef<string | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] =
    useState<CheckoutOrderError | null>(null);
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
    if (createOrder.isPending) {
      return;
    }

    setCheckoutError(null);

    const usableItems = createCheckoutSummaryLines(cart.items);

    if (usableItems.length === 0 || usableItems.length !== cart.items.length) {
      setCheckoutError({
        message:
          "We could not prepare checkout because some cart information is unavailable. Review your bag and try again.",
        stockItems: [],
      });
      return;
    }

    const submissionKey = idempotencyKey ?? createCheckoutIdempotencyKey();
    setIdempotencyKey(submissionKey);
    try {
      const response = await createOrder.mutateOnceAsync(
        createOrderPayload(values, cart.items, submissionKey),
      );

      if (response === null) {
        return;
      }

      queryClient.setQueryData(
        orderKeys.detail(response.data.orderNumber),
        response.data,
      );
      void queryClient.invalidateQueries({
        queryKey: orderKeys.lists,
        refetchType: "none",
      });
      onOrderCreationConfirmed(response.data);
      cart.clearCart();
      setIdempotencyKey(createCheckoutIdempotencyKey());
      navigate(
        `/checkout/success/${encodeURIComponent(response.data.orderNumber)}`,
      );
    } catch (error) {
      setCheckoutError(mapCreateOrderError(error));
    }
  };

  if (!cart.hasHydrated) {
    return (
      <main aria-busy="true" className={styles.page}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>Secure checkout</p>
          <h1>Complete your selection</h1>
          <p>Preparing your locally saved bag...</p>
        </header>
        <div className={styles.loadingLayout} role="status">
          <span className={styles.visuallyHidden}>Preparing checkout</span>
          <div className={styles.loadingForm} />
          <div className={styles.loadingSummary} />
        </div>
      </main>
    );
  }

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
            ? "Checking saved account details..."
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
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={styles.formColumn} aria-label="Checkout details">
            <CustomerDetailsSection />
            <ShippingAddressSection />
            <ShippingMethodSection />
            <PaymentMethodSection />
          </div>
          <div className={styles.summaryColumn}>
            <CheckoutSummary />
          </div>
          <section
            aria-labelledby="checkout-submit-title"
            className={styles.submitSection}
          >
            <div>
              <p className={styles.eyebrow}>Final review</p>
              <h2 id="checkout-submit-title">Ready when you are</h2>
            </div>

            {checkoutError ? (
              <div className={styles.checkoutError} role="alert">
                <p>{checkoutError.message}</p>
                {checkoutError.stockItems.length > 0 ? (
                  <ul>
                    {checkoutError.stockItems.map((stockItem) => {
                      const cartItem = cart.items.find(
                        (item) => item.variantId === stockItem.variantId,
                      );

                      return (
                        <li key={stockItem.variantId}>
                          {cartItem?.product.name ?? "A cart item"}
                          {stockItem.availableStock === undefined
                            ? ""
                            : ` — ${stockItem.availableStock} available`}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
                <ButtonLink size="sm" to="/cart" variant="secondary">
                  Review cart
                </ButtonLink>
              </div>
            ) : null}

            <Button
              disabled={
                isSubmitting ||
                createOrder.isPending ||
                !cart.hasHydrated ||
                cart.items.length === 0
              }
              fullWidth
              type="submit"
            >
              <LockKeyhole aria-hidden="true" />
              {isSubmitting || createOrder.isPending
                ? "Placing order..."
                : "Place order"}
            </Button>
            <p className={styles.submitNote}>
              The server will verify current prices and availability before
              creating the order. Payment processing is not connected yet.
            </p>
          </section>
        </form>
      </FormProvider>
    </main>
  );
}
