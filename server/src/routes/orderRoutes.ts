import { Router } from "express";
import { createOrderController } from "../controllers/orderController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { optionalAuth } from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validate.js";
import { createOrderSchema } from "../schemas/orderSchemas.js";

const router = Router();

router.post(
	"/",
	asyncHandler(optionalAuth),
	validateBody(createOrderSchema),
	asyncHandler(createOrderController),
);

export default router;
