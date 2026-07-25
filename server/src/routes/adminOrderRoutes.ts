import { Router } from "express";
import {
	adminOrderDetailController,
	listAdminOrdersController,
	updateAdminOrderStatusController,
	updateAdminPaymentStatusController,
} from "../controllers/adminOrderController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import {
	adminOrderListQuerySchema,
	adminOrderStatusUpdateSchema,
	adminPaymentStatusUpdateSchema,
} from "../schemas/adminOrderSchemas.js";

const router = Router();

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);

router.get(
	"/",
	validateQuery(adminOrderListQuerySchema),
	asyncHandler(listAdminOrdersController),
);
router.patch(
	"/:orderNumber/status",
	validateBody(adminOrderStatusUpdateSchema),
	asyncHandler(updateAdminOrderStatusController),
);
router.patch(
	"/:orderNumber/payment-status",
	validateBody(adminPaymentStatusUpdateSchema),
	asyncHandler(updateAdminPaymentStatusController),
);
router.get("/:orderNumber", asyncHandler(adminOrderDetailController));

export default router;
