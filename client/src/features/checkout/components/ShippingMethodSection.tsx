import { Check, PackageCheck, Rocket } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { Price } from "../../../components/ui/Price/Price";
import { trackAddShippingInfo } from "../../../services/analytics";
import { useCart } from "../../cart/hooks/useCart";
import { SHIPPING_METHODS } from "../constants/shippingMethods";
import type { CheckoutFormValues } from "../types";
import styles from "./CheckoutOptions.module.scss";
import sectionStyles from "./CheckoutSections.module.scss";

export function ShippingMethodSection() {
	const { control, register } = useFormContext<CheckoutFormValues>();
	const cart = useCart();
	const selectedMethod = useWatch({
		control,
		name: "shippingMethod",
	});

	return (
		<section
			aria-labelledby="shipping-method-title"
			className={sectionStyles.section}
		>
			<header className={styles.legendContent}>
				<span aria-hidden="true" className={styles.sectionNumber}>
					03
				</span>
				<span>
					<h2 id="shipping-method-title">Delivery method</h2>
					<p>Choose the pace that suits your selection.</p>
				</span>
			</header>
			<fieldset className={styles.fieldset}>
				<legend className={styles.legend}>Delivery method</legend>

				<div className={styles.options}>
					{SHIPPING_METHODS.map((method) => {
						const isSelected = selectedMethod === method.id;
						const Icon = method.id === "STANDARD" ? PackageCheck : Rocket;

						return (
							<label className={styles.option} key={method.id}>
								<input
									type="radio"
									value={method.id}
									{...register("shippingMethod", {
										onChange: () => {
											trackAddShippingInfo(cart.items, method.label);
										},
									})}
								/>
								<span className={styles.card}>
									<span aria-hidden="true" className={styles.icon}>
										<Icon />
									</span>
									<span className={styles.copy}>
										<strong>{method.label}</strong>
										<span>{method.description}</span>
									</span>
									<span className={styles.end}>
										<Price
											className={styles.price}
											value={method.priceCents / 100}
										/>
										{isSelected ? (
											<span className={styles.selected}>
												<Check aria-hidden="true" />
												Selected
											</span>
										) : null}
									</span>
								</span>
							</label>
						);
					})}
				</div>
			</fieldset>
		</section>
	);
}
