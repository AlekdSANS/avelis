import { z } from "zod";

const requiredText = (label: string, maxLength: number) =>
	z
		.string()
		.trim()
		.min(1, `${label} is required.`)
		.max(maxLength, `${label} must be ${maxLength} characters or fewer.`);

export const checkoutSchema = z.object({
	customer: z.object({
		firstName: requiredText("First name", 80),
		lastName: requiredText("Last name", 80),
		email: z
			.string()
			.trim()
			.min(1, "Email is required.")
			.email("Enter a valid email address.")
			.max(254, "Email must be 254 characters or fewer.")
			.toLowerCase(),
		phone: z
			.string()
			.trim()
			.min(7, "Enter a valid phone number.")
			.max(25, "Phone must be 25 characters or fewer.")
			.regex(
				/^\+?[0-9][0-9\s()-]*$/,
				"Phone contains unsupported characters.",
			),
	}),
	shippingAddress: z.object({
		country: z.literal("PL"),
		city: requiredText("City", 100),
		postalCode: z
			.string()
			.trim()
			.regex(/^\d{2}-\d{3}$/, "Use the Polish postal code format 00-000."),
		street: requiredText("Street", 150),
		building: requiredText("Building", 30),
		apartment: z
			.string()
			.trim()
			.max(30, "Apartment must be 30 characters or fewer."),
		deliveryNotes: z
			.string()
			.trim()
			.max(500, "Delivery notes must be 500 characters or fewer."),
	}),
	shippingMethod: z.enum(["STANDARD", "EXPRESS"]),
	paymentMethod: z.enum(["CARD", "BLIK", "CASH_ON_DELIVERY"]),
});
