import { Router } from "express";
import { adminDashboardController } from "../controllers/adminController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import adminProductRoutes from "./adminProductRoutes.js";
import adminUploadRoutes from "./adminUploadRoutes.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
	"/dashboard",
	asyncHandler(optionalAuth),
	requireAuth,
	requireAdmin,
	asyncHandler(adminDashboardController),
);
router.use("/products", adminProductRoutes);
router.use("/uploads", adminUploadRoutes);

export default router;
