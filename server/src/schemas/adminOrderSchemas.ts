import { z } from "zod";
import {
	ADMIN_ORDER_DEFAULT_PAGE_SIZE,
	ADMIN_ORDER_MAX_PAGE_SIZE,
} from "../config/adminOrder.js";

const orderStatusSchema = z.enum([
	"PENDING_PAYMENT",
	"CONFIRMED",
	"PROCESSING",
	"SHIPPED",
	"DELIVERED",
	"CANCELLED",
	"REFUNDED",
]);

const paymentStatusSchema = z.enum([
	"PENDING",
	"PAID",
	"FAILED",
	"REFUNDED",
	"CANCELLED",
]);

const paymentMethodSchema = z.enum(["CARD", "BLIK", "CASH_ON_DELIVERY"]);
const shippingMethodSchema = z.enum(["STANDARD", "EXPRESS"]);

function dateBoundary(position: "start" | "end") {
	return z
		.string()
		.trim()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD")
		.refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`)), {
			message: "Date is invalid",
		})
		.transform(
			(value) =>
				new Date(
					`${value}T${position === "start" ? "00:00:00.000" : "23:59:59.999"}Z`,
				),
		);
}

export const adminOrderListQuerySchema = z
	.object({
		search: z.string().trim().min(1).max(160).optional(),
		status: orderStatusSchema.optional(),
		paymentStatus: paymentStatusSchema.optional(),
		paymentMethod: paymentMethodSchema.optional(),
		shippingMethod: shippingMethodSchema.optional(),
		dateFrom: dateBoundary("start").optional(),
		dateTo: dateBoundary("end").optional(),
		minTotal: z.coerce.number().nonnegative().max(99_999_999).optional(),
		maxTotal: z.coerce.number().nonnegative().max(99_999_999).optional(),
		sort: z
			.enum(["newest", "oldest", "total-asc", "total-desc"])
			.default("newest"),
		page: z.coerce.number().int().positive().default(1),
		limit: z.coerce
			.number()
			.int()
			.positive()
			.max(ADMIN_ORDER_MAX_PAGE_SIZE)
			.default(ADMIN_ORDER_DEFAULT_PAGE_SIZE),
	})
	.strict()
	.superRefine((query, context) => {
		if (
			query.dateFrom !== undefined &&
			query.dateTo !== undefined &&
			query.dateFrom > query.dateTo
		) {
			context.addIssue({
				code: "custom",
				message: "Start date must not be after end date",
				path: ["dateFrom"],
			});
		}

		if (
			query.minTotal !== undefined &&
			query.maxTotal !== undefined &&
			query.minTotal > query.maxTotal
		) {
			context.addIssue({
				code: "custom",
				message: "Minimum total must not exceed maximum total",
				path: ["minTotal"],
			});
		}
	});

export const adminOrderStatusUpdateSchema = z
	.object({
		status: orderStatusSchema,
	})
	.strict();

export const adminPaymentStatusUpdateSchema = z
	.object({
		paymentStatus: paymentStatusSchema,
	})
	.strict();

export type AdminOrderListQuery = z.infer<
	typeof adminOrderListQuerySchema
>;
export type AdminOrderStatusUpdateInput = z.infer<
	typeof adminOrderStatusUpdateSchema
>;
export type AdminPaymentStatusUpdateInput = z.infer<
	typeof adminPaymentStatusUpdateSchema
>;
