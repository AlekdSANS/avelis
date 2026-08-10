import { z } from "zod";
export declare const adminOrderListQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        CONFIRMED: "CONFIRMED";
        DELIVERED: "DELIVERED";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        PROCESSING: "PROCESSING";
        REFUNDED: "REFUNDED";
        SHIPPED: "SHIPPED";
    }>>;
    paymentStatus: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        FAILED: "FAILED";
        PAID: "PAID";
        PENDING: "PENDING";
        REFUNDED: "REFUNDED";
    }>>;
    paymentMethod: z.ZodOptional<z.ZodEnum<{
        BLIK: "BLIK";
        CARD: "CARD";
        CASH_ON_DELIVERY: "CASH_ON_DELIVERY";
    }>>;
    shippingMethod: z.ZodOptional<z.ZodEnum<{
        EXPRESS: "EXPRESS";
        STANDARD: "STANDARD";
    }>>;
    dateFrom: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    dateTo: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    minTotal: z.ZodOptional<z.ZodPreprocess<z.ZodCoercedNumber<unknown>>>;
    maxTotal: z.ZodOptional<z.ZodPreprocess<z.ZodCoercedNumber<unknown>>>;
    sort: z.ZodDefault<z.ZodEnum<{
        newest: "newest";
        oldest: "oldest";
        "total-asc": "total-asc";
        "total-desc": "total-desc";
    }>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strict>;
export declare const adminOrderStatusUpdateSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        CONFIRMED: "CONFIRMED";
        DELIVERED: "DELIVERED";
        PENDING_PAYMENT: "PENDING_PAYMENT";
        PROCESSING: "PROCESSING";
        REFUNDED: "REFUNDED";
        SHIPPED: "SHIPPED";
    }>;
}, z.core.$strict>;
export declare const adminPaymentStatusUpdateSchema: z.ZodObject<{
    paymentStatus: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        FAILED: "FAILED";
        PAID: "PAID";
        PENDING: "PENDING";
        REFUNDED: "REFUNDED";
    }>;
}, z.core.$strict>;
export type AdminOrderListQuery = z.infer<typeof adminOrderListQuerySchema>;
export type AdminOrderStatusUpdateInput = z.infer<typeof adminOrderStatusUpdateSchema>;
export type AdminPaymentStatusUpdateInput = z.infer<typeof adminPaymentStatusUpdateSchema>;
//# sourceMappingURL=adminOrderSchemas.d.ts.map