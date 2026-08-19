import { z } from "zod";
export declare const createOrderSchema: z.ZodObject<{
    customer: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodString;
        phone: z.ZodString;
    }, z.core.$strip>;
    shippingAddress: z.ZodObject<{
        country: z.ZodLiteral<"PL">;
        city: z.ZodString;
        postalCode: z.ZodString;
        street: z.ZodString;
        building: z.ZodString;
        apartment: z.ZodOptional<z.ZodString>;
        deliveryNotes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    shippingMethod: z.ZodEnum<{
        EXPRESS: "EXPRESS";
        STANDARD: "STANDARD";
    }>;
    paymentMethod: z.ZodEnum<{
        BLIK: "BLIK";
        CARD: "CARD";
        CASH_ON_DELIVERY: "CASH_ON_DELIVERY";
    }>;
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, z.core.$strip>>;
    idempotencyKey: z.ZodOptional<z.ZodString>;
    promotionCode: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
}, z.core.$strip>;
export declare const orderListQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        CONFIRMED: "CONFIRMED";
        DELIVERED: "DELIVERED";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        PROCESSING: "PROCESSING";
        REFUNDED: "REFUNDED";
        SHIPPED: "SHIPPED";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderListQuery = z.infer<typeof orderListQuerySchema>;
//# sourceMappingURL=orderSchemas.d.ts.map