import { prisma } from "../lib/prisma.js";
import { productSelect } from "../utils/productMapper.js";
export async function findCollections() {
    return prisma.collection.findMany({
        where: { status: "PUBLISHED" },
        select: {
            id: true,
            slug: true,
            name: true,
            eyebrow: true,
            shortDescription: true,
            description: true,
            heroImageUrl: true,
            cardImageUrl: true,
            mobileImageUrl: true,
            accentColor: true,
            storyHeadline: true,
            storyBody: true,
            storyImageUrl: true,
            materialNotes: true,
            campaignLabel: true,
            isFeatured: true,
            sortOrder: true,
            publishedAt: true,
            _count: {
                select: {
                    products: {
                        where: {
                            product: {
                                isActive: true,
                            },
                        },
                    },
                },
            },
        },
        orderBy: [
            { isFeatured: "desc" },
            { sortOrder: "asc" },
            { publishedAt: "desc" },
            { name: "asc" },
            { id: "asc" },
        ],
    });
}
export async function findCollectionBySlug(slug) {
    return prisma.collection.findFirst({
        where: { slug, status: "PUBLISHED" },
        select: {
            id: true,
            slug: true,
            name: true,
            eyebrow: true,
            shortDescription: true,
            description: true,
            heroImageUrl: true,
            cardImageUrl: true,
            mobileImageUrl: true,
            accentColor: true,
            storyHeadline: true,
            storyBody: true,
            storyImageUrl: true,
            materialNotes: true,
            campaignLabel: true,
            isFeatured: true,
            seoTitle: true,
            seoDescription: true,
            products: {
                where: {
                    product: {
                        isActive: true,
                    },
                },
                select: {
                    product: {
                        select: productSelect,
                    },
                },
                orderBy: [{ sortOrder: "asc" }, { productId: "asc" }],
            },
        },
    });
}
//# sourceMappingURL=collectionRepository.js.map