import { prisma } from "../lib/prisma.js";
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
};
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
                        orderBy: [{ format: "asc" }, { volumeMl: "asc" }],
                        take: 1,
                    },
                    images: {
                        select: { url: true, alt: true },
                        orderBy: [
                            { isPrimary: "desc" },
                            { position: "asc" },
                            { createdAt: "asc" },
                        ],
                        take: 1,
                    },
                },
            },
        },
        orderBy: [{ sortOrder: "asc" }, { productId: "asc" }],
    },
};
function buildCollectionWhere(query) {
    return {
        ...(query.search === undefined
            ? {}
            : {
                OR: [
                    { name: { contains: query.search, mode: "insensitive" } },
                    { slug: { contains: query.search, mode: "insensitive" } },
                    {
                        description: {
                            contains: query.search,
                            mode: "insensitive",
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
function buildCollectionOrderBy(sort) {
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
export function countAdminCollections(query) {
    return prisma.collection.count({ where: buildCollectionWhere(query) });
}
export function findAdminCollections(query) {
    return prisma.collection.findMany({
        where: buildCollectionWhere(query),
        select: adminCollectionListSelect,
        orderBy: buildCollectionOrderBy(query.sort),
        skip: (query.page - 1) * query.limit,
        take: query.limit,
    });
}
export function findAdminCollectionById(id) {
    return prisma.collection.findUnique({
        where: { id },
        select: adminCollectionDetailSelect,
    });
}
export function findAdminCollectionBySlug(slug, excludingId) {
    return prisma.collection.findFirst({
        where: {
            slug,
            ...(excludingId === undefined ? {} : { id: { not: excludingId } }),
        },
        select: { id: true },
    });
}
async function validateProductIds(tx, productIds) {
    if (productIds.length === 0)
        return;
    const count = await tx.product.count({ where: { id: { in: [...productIds] } } });
    if (count !== productIds.length) {
        throw new Error("ADMIN_COLLECTION_PRODUCT_NOT_FOUND");
    }
}
export function createAdminCollectionRecord(input) {
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
export function updateAdminCollectionRecord(id, input) {
    return prisma.$transaction(async (tx) => {
        const current = await tx.collection.findUnique({
            where: { id },
            select: { id: true, publishedAt: true },
        });
        if (current === null)
            throw new Error("ADMIN_COLLECTION_NOT_FOUND");
        if (input.productIds !== undefined) {
            await validateProductIds(tx, input.productIds);
        }
        const { productIds, ...fields } = input;
        const data = {};
        if (fields.name !== undefined)
            data.name = fields.name;
        if (fields.slug !== undefined)
            data.slug = fields.slug;
        if (fields.eyebrow !== undefined)
            data.eyebrow = fields.eyebrow;
        if (fields.shortDescription !== undefined) {
            data.shortDescription = fields.shortDescription;
        }
        if (fields.description !== undefined)
            data.description = fields.description;
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
        if (fields.status !== undefined)
            data.status = fields.status;
        if (fields.isFeatured !== undefined)
            data.isFeatured = fields.isFeatured;
        if (fields.sortOrder !== undefined)
            data.sortOrder = fields.sortOrder;
        if (fields.seoTitle !== undefined)
            data.seoTitle = fields.seoTitle;
        if (fields.seoDescription !== undefined) {
            data.seoDescription = fields.seoDescription;
        }
        if (fields.storyHeadline !== undefined)
            data.storyHeadline = fields.storyHeadline;
        if (fields.storyBody !== undefined)
            data.storyBody = fields.storyBody;
        if (fields.storyImageUrl !== undefined)
            data.storyImageUrl = fields.storyImageUrl;
        if (fields.materialNotes !== undefined)
            data.materialNotes = { set: fields.materialNotes };
        if (fields.campaignLabel !== undefined)
            data.campaignLabel = fields.campaignLabel;
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
export function archiveAdminCollectionRecord(id) {
    return prisma.collection.update({
        where: { id },
        data: { status: "ARCHIVED", isFeatured: false },
        select: adminCollectionDetailSelect,
    });
}
//# sourceMappingURL=adminCollectionRepository.js.map