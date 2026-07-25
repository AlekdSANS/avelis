import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { AdminOrderListQuery } from "../schemas/adminOrderSchemas.js";
import {
	adminOrderDetailSelect,
	adminOrderSummarySelect,
} from "../utils/adminOrderMapper.js";
import type {
	OrderStatus,
	PaymentStatus,
} from "../generated/prisma/enums.js";

function buildAdminOrderWhere(
	query: AdminOrderListQuery,
): Prisma.OrderWhereInput {
	const where: Prisma.OrderWhereInput = {};

	if (query.search !== undefined) {
		where.AND = query.search.split(/\s+/).map((searchTerm) => ({
			OR: [
				{
					orderNumber: {
						contains: searchTerm,
						mode: "insensitive",
					},
				},
				{
					customerEmail: {
						contains: searchTerm,
						mode: "insensitive",
					},
				},
				{
					customerFirstName: {
						contains: searchTerm,
						mode: "insensitive",
					},
				},
				{
					customerLastName: {
						contains: searchTerm,
						mode: "insensitive",
					},
				},
				{
					customerPhone: {
						contains: searchTerm,
					},
				},
			],
		}));
	}

	if (query.status !== undefined) where.status = query.status;
	if (query.paymentStatus !== undefined) {
		where.paymentStatus = query.paymentStatus;
	}
	if (query.paymentMethod !== undefined) {
		where.paymentMethod = query.paymentMethod;
	}
	if (query.shippingMethod !== undefined) {
		where.shippingMethod = query.shippingMethod;
	}
	if (query.dateFrom !== undefined || query.dateTo !== undefined) {
		where.createdAt = {
			...(query.dateFrom === undefined ? {} : { gte: query.dateFrom }),
			...(query.dateTo === undefined ? {} : { lte: query.dateTo }),
		};
	}
	if (query.minTotal !== undefined || query.maxTotal !== undefined) {
		where.total = {
			...(query.minTotal === undefined
				? {}
				: { gte: new Prisma.Decimal(query.minTotal) }),
			...(query.maxTotal === undefined
				? {}
				: { lte: new Prisma.Decimal(query.maxTotal) }),
		};
	}

	return where;
}

function buildAdminOrderSort(
	sort: AdminOrderListQuery["sort"],
): Prisma.OrderOrderByWithRelationInput[] {
	switch (sort) {
		case "oldest":
			return [{ createdAt: "asc" }, { id: "asc" }];
		case "total-asc":
			return [{ total: "asc" }, { id: "asc" }];
		case "total-desc":
			return [{ total: "desc" }, { id: "desc" }];
		case "newest":
		default:
			return [{ createdAt: "desc" }, { id: "desc" }];
	}
}

export async function findAdminOrderPage(query: AdminOrderListQuery) {
	const where = buildAdminOrderWhere(query);

	return prisma.$transaction([
		prisma.order.count({ where }),
		prisma.order.findMany({
			where,
			select: adminOrderSummarySelect,
			orderBy: buildAdminOrderSort(query.sort),
			skip: (query.page - 1) * query.limit,
			take: query.limit,
		}),
	]);
}

export function findAdminOrderByNumber(orderNumber: string) {
	return prisma.order.findUnique({
		where: { orderNumber },
		select: adminOrderDetailSelect,
	});
}

const transitionStateSelect = {
	id: true,
	status: true,
	paymentStatus: true,
	paymentMethod: true,
	confirmedAt: true,
	cancelledAt: true,
} satisfies Prisma.OrderSelect;

export type AdminOrderTransitionState = Prisma.OrderGetPayload<{
	select: typeof transitionStateSelect;
}>;

export async function updateAdminOrderStatusAtomically(
	orderNumber: string,
	nextStatus: OrderStatus,
	validate: (order: AdminOrderTransitionState) => void,
) {
	return prisma.$transaction(async (tx) => {
		const current = await tx.order.findUnique({
			where: { orderNumber },
			select: transitionStateSelect,
		});

		if (current === null) {
			throw new Error("ADMIN_ORDER_NOT_FOUND");
		}

		validate(current);
		const now = new Date();
		const updateResult = await tx.order.updateMany({
			where: {
				id: current.id,
				status: current.status,
				paymentStatus: current.paymentStatus,
			},
			data: {
				status: nextStatus,
				...(nextStatus === "CONFIRMED" && current.confirmedAt === null
					? { confirmedAt: now }
					: {}),
				...(nextStatus === "CANCELLED" && current.cancelledAt === null
					? { cancelledAt: now }
					: {}),
			},
		});

		if (updateResult.count !== 1) {
			throw new Error("ADMIN_ORDER_TRANSITION_CONFLICT");
		}

		return tx.order.findUniqueOrThrow({
			where: { orderNumber },
			select: adminOrderDetailSelect,
		});
	});
}

export async function updateAdminPaymentStatusAtomically(
	orderNumber: string,
	nextStatus: PaymentStatus,
	validate: (order: AdminOrderTransitionState) => void,
) {
	return prisma.$transaction(async (tx) => {
		const current = await tx.order.findUnique({
			where: { orderNumber },
			select: transitionStateSelect,
		});

		if (current === null) {
			throw new Error("ADMIN_ORDER_NOT_FOUND");
		}

		validate(current);
		const updateResult = await tx.order.updateMany({
			where: {
				id: current.id,
				status: current.status,
				paymentStatus: current.paymentStatus,
			},
			data: {
				paymentStatus: nextStatus,
			},
		});

		if (updateResult.count !== 1) {
			throw new Error("ADMIN_ORDER_TRANSITION_CONFLICT");
		}

		return tx.order.findUniqueOrThrow({
			where: { orderNumber },
			select: adminOrderDetailSelect,
		});
	});
}
