import { z } from "zod";
const trimmedRequiredString = (max) => z.string().trim().min(1).max(max);
const variantIdSchema = z
    .string()
    .trim()
    .min(1)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/, "Invalid variant ID");
export const createOrderSchema = z.object({
    customer: z.object({
        firstName: trimmedRequiredString(80),
        lastName: trimmedRequiredString(80),
        email: z.string().trim().email().max(254).toLowerCase(),
        phone: z
            .string()
            .trim()
            .min(7)
            .max(25)
            .regex(/^\+?[0-9][0-9\s()-]*$/, "Phone number contains unsupported characters"),
    }),
    shippingAddress: z.object({
        country: z.literal("PL"),
        city: trimmedRequiredString(100),
        postalCode: trimmedRequiredString(20),
        street: trimmedRequiredString(150),
        building: trimmedRequiredString(30),
        apartment: z.string().trim().min(1).max(30).optional(),
        deliveryNotes: z.string().trim().min(1).max(500).optional(),
    }),
    shippingMethod: z.enum(["STANDARD", "EXPRESS"]),
    paymentMethod: z.enum(["CARD", "BLIK", "CASH_ON_DELIVERY"]),
    items: z
        .array(z.object({
        variantId: variantIdSchema,
        quantity: z.number().int().min(1).max(20),
    }))
        .min(1, "Order must contain at least one item")
        .max(50, "Order cannot contain more than 50 distinct items"),
    idempotencyKey: z.string().trim().min(16).max(128).optional(),
    promotionCode: z.string().trim().min(3).max(40).transform((value) => value.toUpperCase()).optional(),
});
export const orderListQuerySchema = z.object({
    status: z
        .enum([
        "PENDING_PAYMENT",
        "CONFIRMED",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "REFUNDED",
    ])
        .optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(10),
});
//# sourceMappingURL=orderSchemas.js.map