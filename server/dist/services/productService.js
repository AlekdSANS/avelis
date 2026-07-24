import { countProducts, findFeaturedProducts, findProductBySlug, findProducts, findRelatedCandidates, findRelatedFallback, findRelatedSource, } from "../repositories/productRepository.js";
import { HttpError } from "../utils/httpError.js";
import { mapProduct } from "../utils/productMapper.js";
function scoreRelatedProduct(product, source) {
    let score = 0;
    if (product.fragranceFamily === source.fragranceFamily) {
        score += 3;
    }
    for (const { collection } of product.collections) {
        if (source.collectionIds.has(collection.id)) {
            score += 2;
        }
    }
    for (const note of product.notes) {
        if (source.noteIds.has(note.note.id)) {
            score += 1;
        }
    }
    return score;
}
export async function listProducts(query) {
    const [total, products] = await Promise.all([
        countProducts(query),
        findProducts(query),
    ]);
    return {
        data: products.map(mapProduct),
        page: query.page,
        limit: query.limit,
        total,
        totalPages: Math.ceil(total / query.limit),
    };
}
export async function getFeaturedProducts(query) {
    const products = await findFeaturedProducts(query.limit);
    return {
        data: products.map(mapProduct),
    };
}
export async function getProductBySlug(slug) {
    const product = await findProductBySlug(slug);
    if (product === null) {
        throw new HttpError(404, "Product not found");
    }
    return {
        data: mapProduct(product),
    };
}
export async function getRelatedProducts(productId) {
    const source = await findRelatedSource(productId);
    if (source === null) {
        throw new HttpError(404, "Product not found");
    }
    const collectionIds = source.collections.map((collection) => collection.collectionId);
    const noteIds = source.notes.map((note) => note.noteId);
    const candidates = await findRelatedCandidates({
        productId: source.id,
        fragranceFamily: source.fragranceFamily,
        collectionIds,
        noteIds,
    });
    const sourceForScoring = {
        fragranceFamily: source.fragranceFamily,
        collectionIds: new Set(collectionIds),
        noteIds: new Set(noteIds),
    };
    const selected = candidates
        .map((product) => ({
        product,
        score: scoreRelatedProduct(product, sourceForScoring),
    }))
        .sort((left, right) => {
        if (right.score !== left.score) {
            return right.score - left.score;
        }
        return right.product.createdAt.getTime() - left.product.createdAt.getTime();
    })
        .slice(0, 4)
        .map(({ product }) => product);
    if (selected.length < 4) {
        const fallback = await findRelatedFallback({
            excludedProductIds: [source.id, ...selected.map((product) => product.id)],
            take: 4 - selected.length,
        });
        selected.push(...fallback);
    }
    return {
        data: selected.map(mapProduct),
    };
}
//# sourceMappingURL=productService.js.map