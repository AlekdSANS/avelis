import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import type {
	AdminCollectionCreateInput,
	AdminCollectionListQuery,
	AdminCollectionUpdateInput,
} from "../schemas/adminCollectionSchemas.js";

const adminCollectionListSelect = {
	id: true,
	name: true,
	slug: true,
	status: true,
	isFeatured: true,
	sortOrder: true,
	cardImageUrl: true,
	publishedAt: true,
	createdAt: true,
	updatedAt: true,
	_count: { select: { products: true } },
} satisfies Prisma.CollectionSelect;

export const adminCollectionDetailSelect = {
	id: true,
	name: true,
	slug: true,
	eyebrow: true,
	shortDescription: true,
	description: true,
	heroImageUrl: true,
	cardImageUrl: true,
	mobileImageUrl: true,
	accentColor: true,
	status: true,
	isFeatured: true,
	sortOrder: true,
	publishedAt: true,
	seoTitle: true,
	seoDescription: true,
	storyHeadline: true,
	storyBody: true,
	storyImageUrl: true,
	materialNotes: true,
	campaignLabel: true,
	createdAt: true,
	updatedAt: true,
	products: {
		select: {
			sortOrder: true,
			product: {
				select: {
					id: true,
					name: true,
					slug: true,
					isActive: true,
					variants: {
						select: { sku: true },
						orderBy: [{ format: "asc" as const }, { volumeMl: "asc" as const }],
						take: 1,
					},
					images: {
						select: { url: true, alt: true },
						orderBy: [
							{ isPrimary: "desc" as const },
							{ position: "asc" as const },
							{ createdAt: "asc" as const },
						],
						take: 1,
					},
				},
			},
		},
		orderBy: [{ sortOrder: "asc" as const }, { productId: "asc" as const }],
	},
} satisfies Prisma.CollectionSelect;

function buildCollectionWhere(
	query: AdminCollectionListQuery,
): Prisma.CollectionWhereInput {
	return {
		...(query.search === undefined
			? {}
			: {
					OR: [
						{ name: { contains: query.search, mode: "insensitive" as const } },
						{ slug: { contains: query.search, mode: "insensitive" as const } },
						{
							description: {
								contains: query.search,
								mode: "insensitive" as const,
							},
						},
					],
				}),
		...(query.status === "all" ? {} : { status: query.status }),
		...(query.featured === "all"
			? {}
			: { isFeatured: query.featured === "true" }),
	};
}

function buildCollectionOrderBy(
	sort: AdminCollectionListQuery["sort"],
): Prisma.CollectionOrderByWithRelationInput[] {
	switch (sort) {
		case "oldest":
			return [{ createdAt: "asc" }, { id: "asc" }];
		case "name-asc":
			return [{ name: "asc" }, { id: "asc" }];
		case "name-desc":
			return [{ name: "desc" }, { id: "asc" }];
		case "sort-order":
			return [{ sortOrder: "asc" }, { name: "asc" }, { id: "asc" }];
		default:
			return [{ createdAt: "desc" }, { id: "desc" }];
	}
}

export function countAdminCollections(query: AdminCollectionListQuery) {
	return prisma.collection.count({ where: buildCollectionWhere(query) });
}

export function findAdminCollections(query: AdminCollectionListQuery) {
	return prisma.collection.findMany({
		where: buildCollectionWhere(query),
		select: adminCollectionListSelect,
		orderBy: buildCollectionOrderBy(query.sort),
		skip: (query.page - 1) * query.limit,
		take: query.limit,
	});
}

export function findAdminCollectionById(id: string) {
	return prisma.collection.findUnique({
		where: { id },
		select: adminCollectionDetailSelect,
	});
}

export function findAdminCollectionBySlug(slug: string, excludingId?: string) {
	return prisma.collection.findFirst({
		where: {
			slug,
			...(excludingId === undefined ? {} : { id: { not: excludingId } }),
		},
		select: { id: true },
	});
}

type TransactionClient = Parameters<
	Parameters<typeof prisma.$transaction>[0]
>[0];

async function validateProductIds(
	tx: TransactionClient,
	productIds: readonly string[],
) {
	if (productIds.length === 0) return;
	const count = await tx.product.count({ where: { id: { in: [...productIds] } } });
	if (count !== productIds.length) {
		throw new Error("ADMIN_COLLECTION_PRODUCT_NOT_FOUND");
	}
}

export function createAdminCollectionRecord(
	input: AdminCollectionCreateInput & { slug: string },
) {
	return prisma.$transaction(async (tx) => {
		await validateProductIds(tx, input.productIds);
		const { productIds, ...data } = input;
		return tx.collection.create({
			data: {
				name: data.name,
				slug: data.slug,
				eyebrow: data.eyebrow ?? null,
				shortDescription: data.shortDescription ?? null,
				description: data.description,
				heroImageUrl: data.heroImageUrl ?? null,
				cardImageUrl: data.cardImageUrl ?? null,
				mobileImageUrl: data.mobileImageUrl ?? null,
				accentColor: data.accentColor ?? null,
				status: data.status,
				isFeatured: data.isFeatured,
				sortOrder: data.sortOrder,
				seoTitle: data.seoTitle ?? null,
				seoDescription: data.seoDescription ?? null,
				storyHeadline: data.storyHeadline ?? null,
				storyBody: data.storyBody ?? null,
				storyImageUrl: data.storyImageUrl ?? null,
				materialNotes: data.materialNotes,
				campaignLabel: data.campaignLabel ?? null,
				publishedAt: data.status === "PUBLISHED" ? new Date() : null,
				products: {
					create: productIds.map((productId, sortOrder) => ({
						sortOrder,
						product: { connect: { id: productId } },
					})),
				},
			},
			select: adminCollectionDetailSelect,
		});
	});
}

export function updateAdminCollectionRecord(
	id: string,
	input: AdminCollectionUpdateInput,
) {
	return prisma.$transaction(async (tx) => {
		const current = await tx.collection.findUnique({
			where: { id },
			select: { id: true, publishedAt: true },
		});
		if (current === null) throw new Error("ADMIN_COLLECTION_NOT_FOUND");

		if (input.productIds !== undefined) {
			await validateProductIds(tx, input.productIds);
		}

		const { productIds, ...fields } = input;
		const data: Prisma.CollectionUpdateInput = {};
		if (fields.name !== undefined) data.name = fields.name;
		if (fields.slug !== undefined) data.slug = fields.slug;
		if (fields.eyebrow !== undefined) data.eyebrow = fields.eyebrow;
		if (fields.shortDescription !== undefined) {
			data.shortDescription = fields.shortDescription;
		}
		if (fields.description !== undefined) data.description = fields.description;
		if (fields.heroImageUrl !== undefined) {
			data.heroImageUrl = fields.heroImageUrl;
		}
		if (fields.cardImageUrl !== undefined) {
			data.cardImageUrl = fields.cardImageUrl;
		}
		if (fields.mobileImageUrl !== undefined) {
			data.mobileImageUrl = fields.mobileImageUrl;
		}
		if (fields.accentColor !== undefined) {
			data.accentColor = fields.accentColor;
		}
		if (fields.status !== undefined) data.status = fields.status;
		if (fields.isFeatured !== undefined) data.isFeatured = fields.isFeatured;
		if (fields.sortOrder !== undefined) data.sortOrder = fields.sortOrder;
		if (fields.seoTitle !== undefined) data.seoTitle = fields.seoTitle;
		if (fields.seoDescription !== undefined) {
			data.seoDescription = fields.seoDescription;
		}
		if (fields.storyHeadline !== undefined) data.storyHeadline = fields.storyHeadline;
		if (fields.storyBody !== undefined) data.storyBody = fields.storyBody;
		if (fields.storyImageUrl !== undefined) data.storyImageUrl = fields.storyImageUrl;
		if (fields.materialNotes !== undefined) data.materialNotes = { set: fields.materialNotes };
		if (fields.campaignLabel !== undefined) data.campaignLabel = fields.campaignLabel;
		if (fields.status === "PUBLISHED" && current.publishedAt === null) {
			data.publishedAt = new Date();
		}

		await tx.collection.update({ where: { id }, data });

		if (productIds !== undefined) {
			await tx.productCollection.deleteMany({ where: { collectionId: id } });
			if (productIds.length > 0) {
				await tx.productCollection.createMany({
					data: productIds.map((productId, sortOrder) => ({
						collectionId: id,
						productId,
						sortOrder,
					})),
				});
			}
		}

		return tx.collection.findUniqueOrThrow({
			where: { id },
			select: adminCollectionDetailSelect,
		});
	});
}

export function archiveAdminCollectionRecord(id: string) {
	return prisma.collection.update({
		where: { id },
		data: { status: "ARCHIVED", isFeatured: false },
		select: adminCollectionDetailSelect,
	});
}
