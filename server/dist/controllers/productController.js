import { getFeaturedProducts, getProductBySlug, getRelatedProducts, listProducts, } from "../services/productService.js";
export async function listProductsController(_req, res) {
    const query = res.locals.query;
    const result = await listProducts(query);
    res.status(200).json(result);
}
export async function featuredProductsController(_req, res) {
    const query = res.locals.query;
    const result = await getFeaturedProducts(query);
    res.status(200).json(result);
}
export async function productBySlugController(req, res) {
    const result = await getProductBySlug(String(req.params.slug ?? ""));
    res.status(200).json(result);
}
export async function relatedProductsController(req, res) {
    const result = await getRelatedProducts(String(req.params.productId ?? ""));
    res.status(200).json(result);
}
//# sourceMappingURL=productController.js.map