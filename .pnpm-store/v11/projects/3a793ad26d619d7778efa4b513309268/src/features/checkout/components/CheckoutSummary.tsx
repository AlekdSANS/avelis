import { useFormContext, useWatch } from "react-hook-form";

import { Price } from "../../../components/ui/Price/Price";
import { ProductImage } from "../../products/components/ProductImage";
import { useCart } from "../../cart/hooks/useCart";
import { getShippingMethodDisplay } from "../constants/shippingMethods";
import type { CheckoutFormValues } from "../types";
import {
	createCheckoutSummaryLines,
	sumCheckoutLines,
} from "../utils/cartSummary";
import styles from "./CheckoutSummary.module.scss";
import { useQuery } from "@tanstack/react-query";
import { merchandisingService } from "../../../services/merchandisingService";

export function CheckoutSummary() {
	const cart = useCart();
	const { control, register } = useFormContext<CheckoutFormValues>();
	const shippingMethod = useWatch({
		control,
		name: "shippingMethod",
	});
	const promotionCode = useWatch({ control, name: "promotionCode" });
	const lines = createCheckoutSummaryLines(cart.items);
	const subtotalCents = sumCheckoutLines(lines);
	const shipping = getShippingMethodDisplay(shippingMethod);
	const promotion = useQuery({ queryKey: ["promotion", promotionCode.trim().toUpperCase(), subtotalCents], queryFn: () => merchandisingService.validatePromotion(promotionCode, subtotalCents / 100), enabled: promotionCode.trim().length >= 3, retry: false });
	const discountCents = Math.round((promotion.data?.discount ?? 0) * 100);
	const totalCents = subtotalCents + shipping.priceCents - discountCents;
	const hasUnavailableCartData = lines.length !== cart.items.length;

	return (
		<aside
			aria-labelledby="checkout-summary-title"
			className={styles.summary}
		>
			<header className={styles.header}>
				<h2 id="checkout-summary-title">Order summary</h2>
				<span>
					{lines.length} {lines.length === 1 ? "selection" : "selections"}
				</span>
			</header>

			{hasUnavailableCartData ? (
				<p className={styles.warning} role="status">
					Some unavailable cart data was omitted. Review your bag before a
					future order submission.
				</p>
			) : null}

			<ul aria-label="Selected fragrances" className={styles.items}>
				{lines.map((line) => (
					<li className={styles.item} key={line.id}>
						<ProductImage
							alt={line.imageAlt}
							className={styles.image}
							src={line.imageUrl}
						/>
						<div className={styles.itemCopy}>
							<h3>{line.productName}</h3>
							<p className={styles.meta}>
								{line.format === "BOTTLE" ? "Bottle" : "Refill"} ·{" "}
								{line.volumeMl} ml · Qty {line.quantity}
							</p>
							<p className={styles.sku}>SKU {line.sku}</p>
							<div className={styles.linePrice}>
								<Price value={line.unitPriceCents / 100} />
								<strong>
									<Price value={line.lineTotalCents / 100} />
								</strong>
							</div>
						</div>
					</li>
				))}
			</ul>

			<div aria-live="polite" className={styles.totals}>
				<label className={styles.promotion}>Promotion code<input autoComplete="off" placeholder="Enter code" {...register("promotionCode")} /></label>
				{promotion.isFetching ? <p className={styles.promotionMessage}>Checking code…</p> : null}
				{promotion.isError ? <p className={styles.warning}>This promotion code is not available.</p> : null}
				{promotion.data ? <div className={styles.totalRow}><span>Promotion · {promotion.data.code}</span><Price value={-promotion.data.discount} /></div> : null}
				<div className={styles.totalRow}>
					<span>Subtotal</span>
					<Price value={subtotalCents / 100} />
				</div>
				<div className={styles.totalRow}>
					<span>Shipping · {shipping.label}</span>
					<Price value={shipping.priceCents / 100} />
				</div>
				<div className={[styles.totalRow, styles.grandTotal].join(" ")}>
					<span>Total</span>
					<strong>
						<Price value={totalCents / 100} />
					</strong>
				</div>
			</div>

			<p className={styles.authority}>
				Displayed shipping and totals are estimates for this UI. The backend
				will recalculate the authoritative EUR total before creating an order.
			</p>
		</aside>
	);
}
