import { useFormContext } from "react-hook-form";

import { Input } from "../../../components/ui/Input/Input";
import type { CheckoutFormValues } from "../types";
import styles from "./CheckoutSections.module.scss";

export function CustomerDetailsSection() {
	const {
		formState: { errors },
		register,
	} = useFormContext<CheckoutFormValues>();

	const firstNameError = errors.customer?.firstName;
	const lastNameError = errors.customer?.lastName;
	const emailError = errors.customer?.email;
	const phoneError = errors.customer?.phone;

	return (
		<section aria-labelledby="customer-details-title" className={styles.section}>
			<header className={styles.sectionHeading}>
				<span aria-hidden="true" className={styles.sectionNumber}>
					01
				</span>
				<div>
					<h2 id="customer-details-title">Customer details</h2>
					<p>We will use these details for your future order confirmation.</p>
				</div>
			</header>

			<div className={styles.fieldGrid}>
				<div className={styles.field}>
					<label htmlFor="checkout-first-name">
						First name
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							firstNameError ? "checkout-first-name-error" : undefined
						}
						aria-invalid={Boolean(firstNameError)}
						autoComplete="given-name"
						className={firstNameError ? styles.invalid : undefined}
						id="checkout-first-name"
						maxLength={80}
						{...register("customer.firstName")}
					/>
					{firstNameError ? (
						<p className={styles.error} id="checkout-first-name-error">
							{firstNameError.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-last-name">
						Last name
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							lastNameError ? "checkout-last-name-error" : undefined
						}
						aria-invalid={Boolean(lastNameError)}
						autoComplete="family-name"
						className={lastNameError ? styles.invalid : undefined}
						id="checkout-last-name"
						maxLength={80}
						{...register("customer.lastName")}
					/>
					{lastNameError ? (
						<p className={styles.error} id="checkout-last-name-error">
							{lastNameError.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-email">
						Email
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							emailError ? "checkout-email-error" : undefined
						}
						aria-invalid={Boolean(emailError)}
						autoComplete="email"
						className={emailError ? styles.invalid : undefined}
						id="checkout-email"
						inputMode="email"
						maxLength={254}
						type="email"
						{...register("customer.email")}
					/>
					{emailError ? (
						<p className={styles.error} id="checkout-email-error">
							{emailError.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-phone">
						Phone
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							phoneError ? "checkout-phone-error" : undefined
						}
						aria-invalid={Boolean(phoneError)}
						autoComplete="tel"
						className={phoneError ? styles.invalid : undefined}
						id="checkout-phone"
						inputMode="tel"
						maxLength={25}
						type="tel"
						{...register("customer.phone")}
					/>
					{phoneError ? (
						<p className={styles.error} id="checkout-phone-error">
							{phoneError.message}
						</p>
					) : null}
				</div>
			</div>
		</section>
	);
}
