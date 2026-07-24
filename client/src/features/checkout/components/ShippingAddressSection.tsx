import { useFormContext } from "react-hook-form";

import { Input } from "../../../components/ui/Input/Input";
import { Select } from "../../../components/ui/Select/Select";
import type { CheckoutFormValues } from "../types";
import styles from "./CheckoutSections.module.scss";

export function ShippingAddressSection() {
	const {
		formState: { errors },
		register,
	} = useFormContext<CheckoutFormValues>();
	const addressErrors = errors.shippingAddress;

	return (
		<section
			aria-labelledby="shipping-address-title"
			className={styles.section}
		>
			<header className={styles.sectionHeading}>
				<span aria-hidden="true" className={styles.sectionNumber}>
					02
				</span>
				<div>
					<h2 id="shipping-address-title">Shipping address</h2>
					<p>Delivery is currently prepared for addresses in Poland.</p>
				</div>
			</header>

			<div className={styles.fieldGrid}>
				<div className={styles.fullField}>
					<label htmlFor="checkout-country">
						Country
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Select
						aria-invalid={Boolean(addressErrors?.country)}
						autoComplete="country"
						id="checkout-country"
						{...register("shippingAddress.country")}
					>
						<option value="PL">Poland</option>
					</Select>
				</div>

				<div className={styles.fullField}>
					<label htmlFor="checkout-street">
						Street
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							addressErrors?.street ? "checkout-street-error" : undefined
						}
						aria-invalid={Boolean(addressErrors?.street)}
						autoComplete="address-line1"
						className={addressErrors?.street ? styles.invalid : undefined}
						id="checkout-street"
						maxLength={150}
						{...register("shippingAddress.street")}
					/>
					{addressErrors?.street ? (
						<p className={styles.error} id="checkout-street-error">
							{addressErrors.street.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-building">
						Building
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							addressErrors?.building
								? "checkout-building-error"
								: undefined
						}
						aria-invalid={Boolean(addressErrors?.building)}
						autoComplete="address-line2"
						className={addressErrors?.building ? styles.invalid : undefined}
						id="checkout-building"
						maxLength={30}
						{...register("shippingAddress.building")}
					/>
					{addressErrors?.building ? (
						<p className={styles.error} id="checkout-building-error">
							{addressErrors.building.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-apartment">Apartment</label>
					<Input
						aria-describedby={
							addressErrors?.apartment
								? "checkout-apartment-error"
								: undefined
						}
						aria-invalid={Boolean(addressErrors?.apartment)}
						className={addressErrors?.apartment ? styles.invalid : undefined}
						id="checkout-apartment"
						maxLength={30}
						{...register("shippingAddress.apartment")}
					/>
					{addressErrors?.apartment ? (
						<p className={styles.error} id="checkout-apartment-error">
							{addressErrors.apartment.message}
						</p>
					) : null}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-postal-code">
						Postal code
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							addressErrors?.postalCode
								? "checkout-postal-code-error"
								: "checkout-postal-code-hint"
						}
						aria-invalid={Boolean(addressErrors?.postalCode)}
						autoComplete="postal-code"
						className={addressErrors?.postalCode ? styles.invalid : undefined}
						id="checkout-postal-code"
						inputMode="numeric"
						maxLength={6}
						placeholder="00-000"
						{...register("shippingAddress.postalCode")}
					/>
					{addressErrors?.postalCode ? (
						<p className={styles.error} id="checkout-postal-code-error">
							{addressErrors.postalCode.message}
						</p>
					) : (
						<p className={styles.hint} id="checkout-postal-code-hint">
							Use the format 00-000.
						</p>
					)}
				</div>

				<div className={styles.field}>
					<label htmlFor="checkout-city">
						City
						<span aria-hidden="true" className={styles.required}>
							*
						</span>
						<span className={styles.visuallyHidden}> required</span>
					</label>
					<Input
						aria-describedby={
							addressErrors?.city ? "checkout-city-error" : undefined
						}
						aria-invalid={Boolean(addressErrors?.city)}
						autoComplete="address-level2"
						className={addressErrors?.city ? styles.invalid : undefined}
						id="checkout-city"
						maxLength={100}
						{...register("shippingAddress.city")}
					/>
					{addressErrors?.city ? (
						<p className={styles.error} id="checkout-city-error">
							{addressErrors.city.message}
						</p>
					) : null}
				</div>

				<div className={styles.fullField}>
					<label htmlFor="checkout-delivery-notes">Delivery notes</label>
					<textarea
						aria-describedby={
							addressErrors?.deliveryNotes
								? "checkout-delivery-notes-error"
								: "checkout-delivery-notes-hint"
						}
						aria-invalid={Boolean(addressErrors?.deliveryNotes)}
						className={[
							styles.textarea,
							addressErrors?.deliveryNotes ? styles.invalid : "",
						]
							.filter(Boolean)
							.join(" ")}
						id="checkout-delivery-notes"
						maxLength={500}
						{...register("shippingAddress.deliveryNotes")}
					/>
					{addressErrors?.deliveryNotes ? (
						<p className={styles.error} id="checkout-delivery-notes-error">
							{addressErrors.deliveryNotes.message}
						</p>
					) : (
						<p className={styles.hint} id="checkout-delivery-notes-hint">
							Optional instructions for the courier, up to 500 characters.
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
