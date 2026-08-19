import type { Prisma } from "../generated/prisma/client.js";

export const orderDetailSelect = {
	id: true,
	orderNumber: true,
	status: true,
	paymentStatus: true,
	paymentMethod: true,
	shippingMethod: true,
	customerEmail: true,
	customerFirstName: true,
	customerLastName: true,
	customerPhone: true,
	shippingCountry: true,
	shippingCity: true,
	shippingPostalCode: true,
	shippingStreet: true,
	shippingBuilding: true,
	shippingApartment: true,
	deliveryNotes: true,
	subtotal: true,
	shippingTotal: true,
	discountTotal: true,
	promotionCode: true,
	total: true,
	currency: true,
	confirmedAt: true,
	cancelledAt: true,
	createdAt: true,
	updatedAt: true,
	items: {
		select: {
			id: true,
			productId: true,
			variantId: true,
			productName: true,
			productSlug: true,
			sku: true,
			format: true,
			volumeMl: true,
			unitPrice: true,
			quantity: true,
			lineTotal: true,
			imageUrl: true,
		},
		orderBy: [{ id: "asc" }],
	},
} satisfies Prisma.OrderSelect;

export const orderSummarySelect = {
	id: true,
	orderNumber: true,
	status: true,
	paymentStatus: true,
	total: true,
	currency: true,
	createdAt: true,
	_count: {
		select: {
			items: true,
		},
	},
	items: {
		select: {
			id: true,
			productName: true,
			imageUrl: true,
			quantity: true,
		},
		orderBy: [{ id: "asc" }],
		take: 4,
	},
} satisfies Prisma.OrderSelect;

export type OrderDetailRecord = Prisma.OrderGetPayload<{
	select: typeof orderDetailSelect;
}>;

export type OrderSummaryRecord = Prisma.OrderGetPayload<{
	select: typeof orderSummarySelect;
}>;

function moneyToNumber(value: Prisma.Decimal) {
	return value.toDecimalPlaces(2).toNumber();
}

export function mapOrderDetail(order: OrderDetailRecord) {
	return {
		id: order.id,
		orderNumber: order.orderNumber,
		status: order.status,
		paymentStatus: order.paymentStatus,
		paymentMethod: order.paymentMethod,
		shippingMethod: order.shippingMethod,
		customer: {
			firstName: order.customerFirstName,
			lastName: order.customerLastName,
			email: order.customerEmail,
			phone: order.customerPhone,
		},
		shippingAddress: {
			country: order.shippingCountry,
			city: order.shippingCity,
			postalCode: order.shippingPostalCode,
			street: order.shippingStreet,
			building: order.shippingBuilding,
			apartment: order.shippingApartment,
			deliveryNotes: order.deliveryNotes,
		},
		items: order.items.map((item) => ({
			id: item.id,
			productId: item.productId,
			variantId: item.variantId,
			productName: item.productName,
			productSlug: item.productSlug,
			sku: item.sku,
			format: item.format,
			volumeMl: item.volumeMl,
			unitPrice: moneyToNumber(item.unitPrice),
			quantity: item.quantity,
			lineTotal: moneyToNumber(item.lineTotal),
			imageUrl: item.imageUrl,
		})),
		subtotal: moneyToNumber(order.subtotal),
		shippingTotal: moneyToNumber(order.shippingTotal),
		discountTotal: moneyToNumber(order.discountTotal),
		promotionCode: order.promotionCode,
		total: moneyToNumber(order.total),
		currency: order.currency,
		confirmedAt: order.confirmedAt?.toISOString() ?? null,
		cancelledAt: order.cancelledAt?.toISOString() ?? null,
		createdAt: order.createdAt.toISOString(),
		updatedAt: order.updatedAt.toISOString(),
	};
}

export function mapOrderSummary(order: OrderSummaryRecord) {
	return {
		id: order.id,
		orderNumber: order.orderNumber,
		status: order.status,
		paymentStatus: order.paymentStatus,
		itemCount: order._count.items,
		total: moneyToNumber(order.total),
		currency: order.currency,
		firstItemImageUrl: order.items[0]?.imageUrl ?? null,
		itemPreviews: order.items.map((item) => ({
			id: item.id,
			productName: item.productName,
			imageUrl: item.imageUrl,
			quantity: item.quantity,
		})),
		createdAt: order.createdAt.toISOString(),
	};
}
