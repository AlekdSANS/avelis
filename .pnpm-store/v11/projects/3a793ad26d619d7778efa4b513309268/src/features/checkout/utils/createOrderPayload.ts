import type { CartItem } from "../../../types/cart";
import type {
	CheckoutFormValues,
	FutureOrderPayload,
} from "../types";
import { createCheckoutSummaryLines } from "./cartSummary";

function optionalTrimmedValue(value: string) {
	const normalized = value.trim();
	return normalized.length > 0 ? normalized : undefined;
}

export function createCheckoutIdempotencyKey() {
	if (typeof window.crypto.randomUUID === "function") {
		return window.crypto.randomUUID();
	}

	const bytes = new Uint8Array(32);
	window.crypto.getRandomValues(bytes);
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
		"",
	);
}

export function createOrderPayload(
	values: CheckoutFormValues,
	cartItems: readonly CartItem[],
	idempotencyKey: string,
): FutureOrderPayload {
	const apartment = optionalTrimmedValue(values.shippingAddress.apartment);
	const deliveryNotes = optionalTrimmedValue(
		values.shippingAddress.deliveryNotes,
	);
	const promotionCode = optionalTrimmedValue(values.promotionCode);

	return {
		customer: {
			firstName: values.customer.firstName.trim(),
			lastName: values.customer.lastName.trim(),
			email: values.customer.email.trim().toLowerCase(),
			phone: values.customer.phone.trim(),
		},
		shippingAddress: {
			country: "PL",
			city: values.shippingAddress.city.trim(),
			postalCode: values.shippingAddress.postalCode.trim(),
			street: values.shippingAddress.street.trim(),
			building: values.shippingAddress.building.trim(),
			...(apartment === undefined ? {} : { apartment }),
			...(deliveryNotes === undefined ? {} : { deliveryNotes }),
		},
		shippingMethod: values.shippingMethod,
		paymentMethod: values.paymentMethod,
		items: createCheckoutSummaryLines(cartItems).map((item) => ({
			variantId: item.variantId,
			quantity: item.quantity,
		})),
		idempotencyKey,
		...(promotionCode === undefined ? {} : { promotionCode: promotionCode.toUpperCase() }),
	};
}
