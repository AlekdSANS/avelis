export const productSelect = {
    id: true,
    slug: true,
    name: true,
    subtitle: true,
    description: true,
    fragranceFamily: true,
    concentration: true,
    gender: true,
    longevity: true,
    season: true,
    occasion: true,
    isFeatured: true,
    isNew: true,
    isLimited: true,
    isActive: true,
    lowStockThreshold: true,
    sampleAvailable: true,
    samplePrice: true,
    backInStockEnabled: true,
    createdAt: true,
    updatedAt: true,
    variants: {
        select: {
            id: true,
            format: true,
            volumeMl: true,
            price: true,
            compareAtPrice: true,
            sku: true,
            stock: true,
        },
        orderBy: [{ format: "asc" }, { volumeMl: "asc" }],
    },
    images: {
        select: {
            id: true,
            url: true,
            storageKey: true,
            mimeType: true,
            sizeBytes: true,
            alt: true,
            position: true,
            isPrimary: true,
            imageType: true,
        },
        orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    },
    notes: {
        select: {
            type: true,
            position: true,
            note: {
                select: {
                    id: true,
                    name: true,
                    isActive: true,
                },
            },
        },
        orderBy: [{ position: "asc" }],
    },
    collections: {
        select: {
            collection: {
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    eyebrow: true,
                    shortDescription: true,
                    description: true,
                    cardImageUrl: true,
                    heroImageUrl: true,
                    accentColor: true,
                    status: true,
                },
            },
        },
    },
    reviews: {
        where: { status: "APPROVED" },
        select: {
            rating: true,
        },
    },
};
const noteTypeRank = {
    TOP: 0,
    HEART: 1,
    BASE: 2,
};
function decimalToNumber(value) {
    return value === null ? null : value.toNumber();
}
export function mapProduct(product) {
    const reviewCount = product.reviews.length;
    const rating = reviewCount === 0
        ? null
        : Number((product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            reviewCount).toFixed(1));
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
        isFeatured: product.isFeatured,
        isNew: product.isNew,
        isLimited: product.isLimited,
        isActive: product.isActive,
        lowStockThreshold: product.lowStockThreshold,
        sampleAvailable: product.sampleAvailable,
        samplePrice: decimalToNumber(product.samplePrice),
        backInStockEnabled: product.backInStockEnabled,
        rating,
        reviewCount,
        images: product.images.map((image) => ({
            id: image.id,
            url: image.url,
            alt: image.alt,
            position: image.position,
            isPrimary: image.isPrimary,
            imageType: image.imageType,
        })),
        variants: product.variants.map((variant) => ({
            id: variant.id,
            format: variant.format,
            volumeMl: variant.volumeMl,
            price: decimalToNumber(variant.price),
            compareAtPrice: decimalToNumber(variant.compareAtPrice),
            sku: variant.sku,
            stock: variant.stock,
        })),
        notes: product.notes
            .filter((note) => note.note.isActive)
            .map((note) => ({
            name: note.note.name,
            type: note.type,
            position: note.position,
        }))
            .sort((left, right) => {
            const typeDelta = noteTypeRank[left.type] - noteTypeRank[right.type];
            return typeDelta === 0 ? left.position - right.position : typeDelta;
        }),
        collections: product.collections
            .filter(({ collection }) => collection.status === "PUBLISHED")
            .map(({ collection }) => ({
            id: collection.id,
            slug: collection.slug,
            name: collection.name,
            eyebrow: collection.eyebrow,
            shortDescription: collection.shortDescription,
            description: collection.description,
            cardImageUrl: collection.cardImageUrl,
            heroImageUrl: collection.heroImageUrl,
            accentColor: collection.accentColor,
        })),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    };
}
//# sourceMappingURL=productMapper.js.map