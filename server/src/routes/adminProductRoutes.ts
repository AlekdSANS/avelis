import { Router } from "express";
import {
	adminProductDetailController,
	deleteAdminProductController,
	listAdminProductsController,
	updateAdminProductStatusController,
} from "../controllers/adminProductController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import {
	adminProductListQuerySchema,
	adminProductStatusSchema,
} from "../schemas/adminProductSchemas.js";

const router = Router();

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);

router.get(
	"/",
	validateQuery(adminProductListQuerySchema),
	asyncHandler(listAdminProductsController),
);
router.patch(
	"/:id/status",
	validateBody(adminProductStatusSchema),
	asyncHandler(updateAdminProductStatusController),
);
router.get("/:id", asyncHandler(adminProductDetailController));
router.delete("/:id", asyncHandler(deleteAdminProductController));

export default router;
