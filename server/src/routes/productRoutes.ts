import { Router } from "express";
import {
	featuredProductsController,
	listProductsController,
	productBySlugController,
	relatedProductsController,
} from "../controllers/productController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateQuery } from "../middleware/validate.js";
import { productReviewsController, submitReviewController } from "../controllers/growthController.js";
import { optionalAuth, requireAuth } from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validate.js";
import { reviewCreateSchema } from "../schemas/growthSchemas.js";
import {
	featuredProductsQuerySchema,
	productListQuerySchema,
} from "../schemas/productSchemas.js";

const router = Router();

router.get(
	"/",
	validateQuery(productListQuerySchema),
	asyncHandler(listProductsController),
);
router.get(
	"/featured",
	validateQuery(featuredProductsQuerySchema),
	asyncHandler(featuredProductsController),
);
router.get("/related/:productId", asyncHandler(relatedProductsController));
router.get("/:slug/reviews", asyncHandler(productReviewsController));
router.post("/:slug/reviews", asyncHandler(optionalAuth), requireAuth, validateBody(reviewCreateSchema), asyncHandler(submitReviewController));
router.get("/:slug", asyncHandler(productBySlugController));

export default router;
