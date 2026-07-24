import { Router } from "express";
import {
	createOrderController,
	listOrdersController,
	orderDetailController,
} from "../controllers/orderController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import {
	createOrderSchema,
	orderListQuerySchema,
} from "../schemas/orderSchemas.js";

const router = Router();

router.post(
	"/",
	asyncHandler(optionalAuth),
	validateBody(createOrderSchema),
	asyncHandler(createOrderController),
);
router.get(
	"/",
	asyncHandler(optionalAuth),
	requireAuth,
	validateQuery(orderListQuerySchema),
	asyncHandler(listOrdersController),
);
router.get(
	"/:orderNumber",
	asyncHandler(optionalAuth),
	requireAuth,
	asyncHandler(orderDetailController),
);

export default router;
