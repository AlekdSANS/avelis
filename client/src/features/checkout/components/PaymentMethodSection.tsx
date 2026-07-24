import {
	Banknote,
	Check,
	CreditCard,
	Info,
	Smartphone,
} from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { PAYMENT_METHODS } from "../constants/shippingMethods";
import type {
	CheckoutFormValues,
	CheckoutPaymentMethod,
} from "../types";
import styles from "./CheckoutOptions.module.scss";
import sectionStyles from "./CheckoutSections.module.scss";

const paymentIcons: Record<
	CheckoutPaymentMethod,
	typeof CreditCard
> = {
	CARD: CreditCard,
	BLIK: Smartphone,
	CASH_ON_DELIVERY: Banknote,
};

export function PaymentMethodSection() {
	const { control, register } = useFormContext<CheckoutFormValues>();
	const selectedMethod = useWatch({
		control,
		name: "paymentMethod",
	});

	return (
		<section
			aria-labelledby="payment-method-title"
			className={sectionStyles.section}
		>
			<fieldset className={styles.fieldset}>
				<legend className={styles.legend}>
					<span className={styles.legendContent}>
						<span aria-hidden="true" className={styles.sectionNumber}>
							04
						</span>
						<span>
							<h2 id="payment-method-title">Payment method</h2>
							<p>Select how you would like to pay in a later stage.</p>
						</span>
					</span>
				</legend>

				<div className={styles.options}>
					{PAYMENT_METHODS.map((method) => {
						const Icon = paymentIcons[method.id];
						const isSelected = selectedMethod === method.id;

						return (
							<label className={styles.option} key={method.id}>
								<input
									type="radio"
									value={method.id}
									{...register("paymentMethod")}
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

				<p className={styles.notice}>
					<Info aria-hidden="true" />
					<span>
						Payment processing will be connected in a later stage. No
						payment details are collected here.
					</span>
				</p>
			</fieldset>
		</section>
	);
}
