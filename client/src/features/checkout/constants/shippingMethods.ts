import type {
	CheckoutPaymentMethod,
	CheckoutShippingMethod,
} from "../types";

export type ShippingMethodDisplay = {
	description: string;
	id: CheckoutShippingMethod;
	label: string;
	priceCents: number;
};

// Display-only values. The backend recalculates the authoritative shipping total.
export const SHIPPING_METHODS: readonly ShippingMethodDisplay[] = [
	{
		id: "STANDARD",
		label: "Standard delivery",
		description: "Estimated delivery in 3–5 business days",
		priceCents: 1900,
	},
	{
		id: "EXPRESS",
		label: "Express delivery",
		description: "Estimated delivery in 1–2 business days",
		priceCents: 3900,
	},
];

export const PAYMENT_METHODS: readonly {
	description: string;
	id: CheckoutPaymentMethod;
	label: string;
}[] = [
	{
		id: "CARD",
		label: "Card",
		description: "Select card payment for the future payment step.",
	},
	{
		id: "BLIK",
		label: "BLIK",
		description: "A BLIK code will only be requested after provider integration.",
	},
	{
		id: "CASH_ON_DELIVERY",
		label: "Cash on delivery",
		description: "Pay the courier when your order arrives.",
	},
];

export function getShippingMethodDisplay(method: CheckoutShippingMethod) {
	return (
		SHIPPING_METHODS.find((option) => option.id === method) ??
		SHIPPING_METHODS[0]
	);
}
