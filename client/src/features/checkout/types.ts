export type CheckoutShippingMethod = "STANDARD" | "EXPRESS";
export type CheckoutPaymentMethod = "CARD" | "BLIK" | "CASH_ON_DELIVERY";

export type CheckoutFormValues = {
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
		apartment: string;
		deliveryNotes: string;
	};
	shippingMethod: CheckoutShippingMethod;
	paymentMethod: CheckoutPaymentMethod;
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
