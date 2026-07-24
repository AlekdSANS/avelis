import type { Prisma } from "../generated/prisma/client.js";
import { LOW_STOCK_THRESHOLD } from "../config/admin.js";
import { prisma } from "../lib/prisma.js";
import type {
	AdminProductListQuery,
	AdminProductStatusInput,
} from "../schemas/adminProductSchemas.js";
import {
	adminProductListSelect,
	type AdminProductListRecord,
} from "../utils/adminProductMapper.js";
import { productSelect } from "../utils/productMapper.js";

const insensitive = "insensitive" as const;

export function buildAdminProductWhere(
	query: AdminProductListQuery,
): Prisma.ProductWhereInput {
	const and: Prisma.ProductWhereInput[] = [];

	if (query.search !== undefined) {
		and.push({
			OR: [
				{ name: { contains: query.search, mode: insensitive } },
				{ slug: { contains: query.search, mode: insensitive } },
				{
					variants: {
						some: {
							sku: { contains: query.search, mode: insensitive },
						},
					},
				},
			],
		});
	}

	switch (query.status) {
		case "active":
			and.push({ isActive: true });
			break;
		case "inactive":
			and.push({ isActive: false });
			break;
		case "featured":
			and.push({ isFeatured: true });
			break;
		case "new":
			and.push({ isNew: true });
			break;
		case "limited":
			and.push({ isLimited: true });
			break;
		case "all":
			break;
	}

	if (query.family !== undefined) {
		and.push({
			fragranceFamily: {
				equals: query.family,
				mode: insensitive,
			},
		});
	}

	if (query.concentration !== undefined) {
		and.push({
			concentration: {
				equals: query.concentration,
				mode: insensitive,
			},
		});
	}

	if (query.format !== "all") {
		and.push({
			variants: {
				some: {
					format: query.format,
				},
			},
		});
	}

	if (query.collection !== undefined) {
		and.push({
			collections: {
				some: {
					collection: {
						slug: query.collection,
					},
				},
			},
		});
	}

	switch (query.stock) {
		case "in-stock":
			and.push({ variants: { some: { stock: { gt: 0 } } } });
			break;
		case "low-stock":
			and.push({
				variants: {
					some: {
						stock: {
							gt: 0,
							lte: LOW_STOCK_THRESHOLD,
						},
					},
				},
			});
			break;
		case "out-of-stock":
			and.push({
				variants: {
					some: {},
					every: {
						stock: 0,
					},
				},
			});
			break;
		case "all":
			break;
	}

	return and.length > 0 ? { AND: and } : {};
}

function getAdminProductOrderBy(
	sort: AdminProductListQuery["sort"],
): Prisma.ProductOrderByWithRelationInput[] {
	switch (sort) {
		case "oldest":
			return [{ createdAt: "asc" }, { id: "asc" }];
		case "name-asc":
			return [{ name: "asc" }, { id: "asc" }];
		case "name-desc":
			return [{ name: "desc" }, { id: "asc" }];
		case "newest":
		default:
			return [{ createdAt: "desc" }, { id: "asc" }];
	}
}

async function findAggregateSortedProductIds(
	query: AdminProductListQuery,
	where: Prisma.ProductWhereInput,
) {
	const skip = (query.page - 1) * query.limit;
	const isPriceSort =
		query.sort === "price-asc" || query.sort === "price-desc";
	const direction =
		query.sort === "price-asc" || query.sort === "stock-asc"
			? "asc"
			: "desc";

	if (isPriceSort) {
		const rows = await prisma.productVariant.groupBy({
			by: ["productId"],
			where: {
				product: where,
			},
			_min: { price: true },
			orderBy: [
				{ _min: { price: direction } },
				{ productId: "asc" },
			],
			skip,
			take: query.limit,
		});

		return rows.map((row) => row.productId);
	}

	const rows = await prisma.productVariant.groupBy({
		by: ["productId"],
		where: {
			product: where,
		},
		_sum: { stock: true },
		orderBy: [
			{ _sum: { stock: direction } },
			{ productId: "asc" },
		],
		skip,
		take: query.limit,
	});

	return rows.map((row) => row.productId);
}

export function countAdminProducts(query: AdminProductListQuery) {
	return prisma.product.count({
		where: buildAdminProductWhere(query),
	});
}

export async function findAdminProducts(
	query: AdminProductListQuery,
): Promise<AdminProductListRecord[]> {
	const where = buildAdminProductWhere(query);
	const usesAggregateSort =
		query.sort.startsWith("price-") || query.sort.startsWith("stock-");

	if (usesAggregateSort) {
		const productIds = await findAggregateSortedProductIds(query, where);
		if (productIds.length === 0) {
			return [];
		}

		const products = await prisma.product.findMany({
			where: {
				id: { in: productIds },
			},
			select: adminProductListSelect,
		});
		const positionById = new Map(productIds.map((id, index) => [id, index]));

		return products.sort(
			(left, right) =>
				(positionById.get(left.id) ?? 0) - (positionById.get(right.id) ?? 0),
		);
	}

	return prisma.product.findMany({
		where,
		select: adminProductListSelect,
		orderBy: getAdminProductOrderBy(query.sort),
		skip: (query.page - 1) * query.limit,
		take: query.limit,
	});
}

export function findAdminProductById(id: string) {
	return prisma.product.findUnique({
		where: { id },
		select: productSelect,
	});
}

export function updateAdminProductStatus(
	id: string,
	input: AdminProductStatusInput,
) {
	const data: Prisma.ProductUpdateInput = {};

	if (input.isActive !== undefined) {
		data.isActive = input.isActive;
	}
	if (input.isFeatured !== undefined) {
		data.isFeatured = input.isFeatured;
	}
	if (input.isNew !== undefined) {
		data.isNew = input.isNew;
	}
	if (input.isLimited !== undefined) {
		data.isLimited = input.isLimited;
	}

	return prisma.product.update({
		where: { id },
		data,
		select: adminProductListSelect,
	});
}

export function deactivateAdminProduct(id: string) {
	return prisma.product.update({
		where: { id },
		data: { isActive: false },
		select: adminProductListSelect,
	});
}
