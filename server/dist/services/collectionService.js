import { findCollectionBySlug, findCollections, } from "../repositories/collectionRepository.js";
import { HttpError } from "../utils/httpError.js";
import { mapProduct } from "../utils/productMapper.js";
export async function listCollections() {
    const collections = await findCollections();
    return {
        data: collections.map((collection) => ({
            id: collection.id,
            slug: collection.slug,
            name: collection.name,
            eyebrow: collection.eyebrow,
            shortDescription: collection.shortDescription,
            description: collection.description,
            heroImageUrl: collection.heroImageUrl,
            cardImageUrl: collection.cardImageUrl,
            mobileImageUrl: collection.mobileImageUrl,
            accentColor: collection.accentColor,
            storyHeadline: collection.storyHeadline,
            storyBody: collection.storyBody,
            storyImageUrl: collection.storyImageUrl,
            materialNotes: collection.materialNotes,
            campaignLabel: collection.campaignLabel,
            isFeatured: collection.isFeatured,
            productCount: collection._count.products,
        })),
    };
}
export async function getCollectionBySlug(slug) {
    const collection = await findCollectionBySlug(slug);
    if (collection === null) {
        throw new HttpError(404, "Collection not found");
    }
    return {
        data: {
            id: collection.id,
            slug: collection.slug,
            name: collection.name,
            eyebrow: collection.eyebrow,
            shortDescription: collection.shortDescription,
            description: collection.description,
            heroImageUrl: collection.heroImageUrl,
            cardImageUrl: collection.cardImageUrl,
            mobileImageUrl: collection.mobileImageUrl,
            accentColor: collection.accentColor,
            storyHeadline: collection.storyHeadline,
            storyBody: collection.storyBody,
            storyImageUrl: collection.storyImageUrl,
            materialNotes: collection.materialNotes,
            campaignLabel: collection.campaignLabel,
            isFeatured: collection.isFeatured,
            seoTitle: collection.seoTitle,
            seoDescription: collection.seoDescription,
            products: collection.products.map(({ product }) => mapProduct(product)),
        },
    };
}
//# sourceMappingURL=collectionService.js.map