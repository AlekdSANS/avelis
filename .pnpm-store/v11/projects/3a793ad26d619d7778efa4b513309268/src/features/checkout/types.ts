import { z } from "zod";

import type { CreateOrderInput } from "../../types/order";
import { checkoutSchema } from "./schemas/checkoutSchema";

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
export type CheckoutShippingMethod = CheckoutFormValues["shippingMethod"];
export type CheckoutPaymentMethod = CheckoutFormValues["paymentMethod"];

export type FutureOrderPayload = CreateOrderInput;

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
	promotionCode: "",
};
