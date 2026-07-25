import { Router } from "express";
import {
	adminOrderDetailController,
	listAdminOrdersController,
} from "../controllers/adminOrderController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateQuery } from "../middleware/validate.js";
import { adminOrderListQuerySchema } from "../schemas/adminOrderSchemas.js";

const router = Router();

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);

router.get(
	"/",
	validateQuery(adminOrderListQuerySchema),
	asyncHandler(listAdminOrdersController),
);
router.get("/:orderNumber", asyncHandler(adminOrderDetailController));

export default router;
