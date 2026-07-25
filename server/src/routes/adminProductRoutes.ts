import { Router } from "express";
import {
	adminProductDetailController,
	adminProductReferenceNotesController,
	adminProductReferenceCollectionsController,
	createAdminProductController,
	deleteAdminProductController,
	listAdminProductsController,
	updateAdminProductController,
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
	adminProductCreateSchema,
	adminProductStatusSchema,
	adminProductUpdateSchema,
} from "../schemas/adminProductSchemas.js";

const router = Router();

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);

router.get(
	"/",
	validateQuery(adminProductListQuerySchema),
	asyncHandler(listAdminProductsController),
);
router.post(
	"/",
	validateBody(adminProductCreateSchema),
	asyncHandler(createAdminProductController),
);
router.get(
	"/references/notes",
	asyncHandler(adminProductReferenceNotesController),
);
router.get(
	"/references/collections",
	asyncHandler(adminProductReferenceCollectionsController),
);
router.patch(
	"/:id/status",
	validateBody(adminProductStatusSchema),
	asyncHandler(updateAdminProductStatusController),
);
router.patch(
	"/:id",
	validateBody(adminProductUpdateSchema),
	asyncHandler(updateAdminProductController),
);
router.get("/:id", asyncHandler(adminProductDetailController));
router.delete("/:id", asyncHandler(deleteAdminProductController));

export default router;
