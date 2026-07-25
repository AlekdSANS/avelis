import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { AdminOrderListQuery } from "../schemas/adminOrderSchemas.js";
import {
	adminOrderDetailSelect,
	adminOrderSummarySelect,
} from "../utils/adminOrderMapper.js";

function buildAdminOrderWhere(
	query: AdminOrderListQuery,
): Prisma.OrderWhereInput {
	const where: Prisma.OrderWhereInput = {};

	if (query.search !== undefined) {
		where.OR = [
			{
				orderNumber: {
					contains: query.search,
					mode: "insensitive",
				},
			},
			{
				customerEmail: {
					contains: query.search,
					mode: "insensitive",
				},
			},
			{
				customerFirstName: {
					contains: query.search,
					mode: "insensitive",
				},
			},
			{
				customerLastName: {
					contains: query.search,
					mode: "insensitive",
				},
			},
			{
				customerPhone: {
					contains: query.search,
				},
			},
		];
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
