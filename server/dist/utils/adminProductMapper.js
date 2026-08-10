import { LOW_STOCK_THRESHOLD } from "../config/admin.js";
export const adminProductListSelect = {
    id: true,
    slug: true,
    name: true,
    fragranceFamily: true,
    concentration: true,
    isActive: true,
    isFeatured: true,
    isNew: true,
    isLimited: true,
    updatedAt: true,
    variants: {
        select: {
            price: true,
            stock: true,
        },
    },
    images: {
        select: {
            url: true,
            alt: true,
        },
        orderBy: [{ isPrimary: "desc" }, { position: "asc" }, { createdAt: "asc" }],
        take: 1,
    },
    _count: {
        select: {
            collections: true,
        },
    },
};
function decimalToNumber(value) {
    return value?.toDecimalPlaces(2).toNumber() ?? null;
}
export function mapAdminProductSummary(product) {
    const stockValues = product.variants.map((variant) => variant.stock);
    const prices = product.variants.map((variant) => variant.price);
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        fragranceFamily: product.fragranceFamily,
        concentration: product.concentration,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isLimited: product.isLimited,
        primaryImage: product.images[0] ?? null,
        startingPrice: prices.length === 0
            ? null
            : decimalToNumber(prices.reduce((lowest, price) => price.lessThan(lowest) ? price : lowest)),
        variantCount: product.variants.length,
        totalStock: stockValues.reduce((sum, stock) => sum + stock, 0),
        lowStockVariantCount: stockValues.filter((stock) => stock > 0 && stock <= LOW_STOCK_THRESHOLD).length,
        outOfStockVariantCount: stockValues.filter((stock) => stock === 0).length,
        collectionCount: product._count.collections,
        updatedAt: product.updatedAt.toISOString(),
    };
}
export function mapAdminProductDetail(product) {
    return {
        id: product.id,
        slug: product.slug,
        name: product.name,
        subtitle: product.subtitle,
        description: product.description,
        fragranceFamily: product.fragranceFamily,
        concentration: product.concentration,
        gender: product.gender,
        longevity: product.longevity,
        season: product.season,
        occasion: product.occasion,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isLimited: product.isLimited,
        variants: product.variants.map((variant) => ({
            id: variant.id,
            format: variant.format,
            volumeMl: variant.volumeMl,
            price: decimalToNumber(variant.price),
            compareAtPrice: decimalToNumber(variant.compareAtPrice),
            sku: variant.sku,
            stock: variant.stock,
        })),
        images: product.images.map((image) => ({
            id: image.id,
            url: image.url,
            storageKey: image.storageKey,
            mimeType: image.mimeType,
            sizeBytes: image.sizeBytes,
            alt: image.alt,
            position: image.position,
            isPrimary: image.isPrimary,
            imageType: image.imageType,
        })),
        notes: product.notes
            .map((relation) => ({
            noteId: relation.note.id,
            name: relation.note.name,
            isActive: relation.note.isActive,
            type: relation.type,
            position: relation.position,
        }))
            .sort((left, right) => {
            const rank = { TOP: 0, HEART: 1, BASE: 2 };
            return rank[left.type] - rank[right.type] || left.position - right.position;
        }),
        collections: product.collections
            .map(({ collection }) => ({
            id: collection.id,
            slug: collection.slug,
            name: collection.name,
            isActive: collection.status === "PUBLISHED",
        }))
            .sort((left, right) => left.name.localeCompare(right.name)),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    };
}
//# sourceMappingURL=adminProductMapper.js.map