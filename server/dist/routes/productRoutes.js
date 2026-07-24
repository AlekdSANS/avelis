import { Router } from "express";
import { featuredProductsController, listProductsController, productBySlugController, relatedProductsController, } from "../controllers/productController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateQuery } from "../middleware/validate.js";
import { featuredProductsQuerySchema, productListQuerySchema, } from "../schemas/productSchemas.js";
const router = Router();
router.get("/", validateQuery(productListQuerySchema), asyncHandler(listProductsController));
router.get("/featured", validateQuery(featuredProductsQuerySchema), asyncHandler(featuredProductsController));
router.get("/related/:productId", asyncHandler(relatedProductsController));
router.get("/:slug", asyncHandler(productBySlugController));
export default router;
//# sourceMappingURL=productRoutes.js.map