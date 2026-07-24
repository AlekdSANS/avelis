import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type { ProductListQuery } from "../schemas/productSchemas.js";
import { productSelect } from "../utils/productMapper.js";

const insensitive = "insensitive" as const;

function hasVariantFilters(query: ProductListQuery) {
	return (
		(query.format?.length ?? 0) > 0 ||
		(query.volume?.length ?? 0) > 0 ||
		query.inStock === true ||
		query.minPrice !== undefined ||
		query.maxPrice !== undefined
	);
}

export function buildVariantWhere(query: ProductListQuery) {
	const where: Prisma.ProductVariantWhereInput = {};

	if (query.format !== undefined && query.format.length > 0) {
		where.format = { in: query.format };
	}

	if (query.volume !== undefined && query.volume.length > 0) {
		where.volumeMl = { in: query.volume };
	}

	if (query.inStock === true) {
		where.stock = { gt: 0 };
	}

	if (query.minPrice !== undefined || query.maxPrice !== undefined) {
		where.price = {
			...(query.minPrice !== undefined ? { gte: query.minPrice } : {}),
			...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}),
		};
	}

	return where;
}

function buildTextSearch(term: string) {
	return {
		OR: [
			{ name: { contains: term, mode: insensitive } },
			{ subtitle: { contains: term, mode: insensitive } },
			{ description: { contains: term, mode: insensitive } },
			{ fragranceFamily: { contains: term, mode: insensitive } },
			{
				notes: {
					some: {
						note: {
							name: { contains: term, mode: insensitive },
						},
					},
				},
			},
		],
	} satisfies Prisma.ProductWhereInput;
}

export function buildProductWhere(query: ProductListQuery) {
	const where: Prisma.ProductWhereInput = {
		isActive: true,
	};
	const and: Prisma.ProductWhereInput[] = [];

	if (query.search !== undefined) {
		and.push(
			...query.search
				.split(/[,\s]+/)
				.map((term) => term.trim())
				.filter(Boolean)
				.map(buildTextSearch),
		);
	}

	if (query.family !== undefined && query.family.length > 0) {
		and.push({
			OR: query.family.map((family) => ({
				fragranceFamily: { contains: family, mode: insensitive },
			})),
		});
	}

	if (query.season !== undefined && query.season.length > 0) {
		and.push({
			season: { hasSome: query.season.map((season) => season.toLowerCase()) },
		});
	}

	if (query.concentration !== undefined && query.concentration.length > 0) {
		and.push({
			OR: query.concentration.map((concentration) => ({
				concentration: { contains: concentration, mode: insensitive },
			})),
		});
	}

	if (query.collection !== undefined && query.collection.length > 0) {
		and.push({
			collections: {
				some: {
					collection: {
						slug: { in: query.collection },
					},
				},
			},
		});
	}

	if (hasVariantFilters(query)) {
		and.push({
			variants: {
				some: buildVariantWhere(query),
			},
		});
	}

	if (and.length > 0) {
		where.AND = and;
	}

	return where;
}

function getOrderBy(sort: ProductListQuery["sort"]) {
	switch (sort) {
		case "newest":
			return [{ createdAt: "desc" }, { id: "asc" }] satisfies Prisma.ProductOrderByWithRelationInput[];
		case "rating":
			return [
				{ reviews: { _count: "desc" } },
				{ createdAt: "desc" },
				{ id: "asc" },
			] satisfies Prisma.ProductOrderByWithRelationInput[];
		case "featured":
		default:
			return [
				{ isFeatured: "desc" },
				{ createdAt: "desc" },
				{ id: "asc" },
			] satisfies Prisma.ProductOrderByWithRelationInput[];
	}
}

export async function countProducts(query: ProductListQuery) {
	return prisma.product.count({
		where: buildProductWhere(query),
	});
}

export async function findProducts(query: ProductListQuery) {
	const skip = (query.page - 1) * query.limit;
	const where = buildProductWhere(query);

	if (query.sort === "price-asc" || query.sort === "price-desc") {
		const variantWhere = buildVariantWhere(query);
		const rows = await prisma.productVariant.groupBy({
			by: ["productId"],
			where: {
				...variantWhere,
				product: where,
			},
			_min: {
				price: true,
			},
			orderBy: [
				{ _min: { price: query.sort === "price-asc" ? "asc" : "desc" } },
				{ productId: "asc" },
			],
			skip,
			take: query.limit,
		});

		const productIds = rows.map((row) => row.productId);

		if (productIds.length === 0) {
			return [];
		}

		const products = await prisma.product.findMany({
			where: {
				id: { in: productIds },
			},
			select: productSelect,
		});
		const positionById = new Map(productIds.map((id, index) => [id, index]));

		return products.sort(
			(left, right) =>
				(positionById.get(left.id) ?? 0) - (positionById.get(right.id) ?? 0),
		);
	}

	return prisma.product.findMany({
		where,
		select: productSelect,
		orderBy: getOrderBy(query.sort),
		skip,
		take: query.limit,
	});
}

export async function findFeaturedProducts(limit: number) {
	return prisma.product.findMany({
		where: {
			isActive: true,
			isFeatured: true,
		},
		select: productSelect,
		orderBy: [{ createdAt: "desc" }, { id: "asc" }],
		take: limit,
	});
}

export async function findProductBySlug(slug: string) {
	return prisma.product.findFirst({
		where: {
			slug,
			isActive: true,
		},
		select: productSelect,
	});
}

export async function findRelatedSource(productId: string) {
	return prisma.product.findFirst({
		where: {
			id: productId,
			isActive: true,
		},
		select: {
			id: true,
			fragranceFamily: true,
			collections: {
				select: {
					collectionId: true,
				},
			},
			notes: {
				select: {
					noteId: true,
				},
			},
		},
	});
}

export async function findRelatedCandidates(params: {
	productId: string;
	fragranceFamily: string;
	collectionIds: string[];
	noteIds: string[];
}) {
	const or: Prisma.ProductWhereInput[] = [
		{ fragranceFamily: params.fragranceFamily },
	];

	if (params.collectionIds.length > 0) {
		or.push({
			collections: {
				some: {
					collectionId: { in: params.collectionIds },
				},
			},
		});
	}

	if (params.noteIds.length > 0) {
		or.push({
			notes: {
				some: {
					noteId: { in: params.noteIds },
				},
			},
		});
	}

	return prisma.product.findMany({
		where: {
			id: { not: params.productId },
			isActive: true,
			OR: or,
		},
		select: productSelect,
		orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }, { id: "asc" }],
		take: 12,
	});
}

export async function findRelatedFallback(params: {
	excludedProductIds: string[];
	take: number;
}) {
	return prisma.product.findMany({
		where: {
			id: { notIn: params.excludedProductIds },
			isActive: true,
		},
		select: productSelect,
		orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }, { id: "asc" }],
		take: params.take,
	});
}
