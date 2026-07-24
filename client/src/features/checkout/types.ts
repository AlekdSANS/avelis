import { z } from "zod";

import { checkoutSchema } from "./schemas/checkoutSchema";

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type CheckoutShippingMethod = CheckoutFormValues["shippingMethod"];
export type CheckoutPaymentMethod = CheckoutFormValues["paymentMethod"];

export type FutureOrderPayload = {
	customer: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
	};
	shippingAddress: {
		country: "PL";
		city: string;
		postalCode: string;
		street: string;
		building: string;
		apartment?: string;
		deliveryNotes?: string;
	};
	shippingMethod: CheckoutShippingMethod;
	paymentMethod: CheckoutPaymentMethod;
	items: {
		variantId: string;
		quantity: number;
	}[];
	idempotencyKey: string;
};

export const checkoutDefaultValues: CheckoutFormValues = {
	customer: {
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
	},
	shippingAddress: {
		country: "PL",
		city: "",
		postalCode: "",
		street: "",
		building: "",
		apartment: "",
		deliveryNotes: "",
	},
	shippingMethod: "STANDARD",
	paymentMethod: "CARD",
};
