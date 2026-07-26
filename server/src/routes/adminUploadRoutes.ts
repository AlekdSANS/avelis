import { Router } from "express";
import multer from "multer";
import {
	PRODUCT_UPLOAD_MAX_BYTES,
	PRODUCT_UPLOAD_MAX_FILES,
} from "../config/uploads.js";
import {
	deleteAdminCollectionUploadController,
	deleteAdminProductUploadController,
	uploadAdminCollectionImagesController,
	uploadAdminProductImagesController,
} from "../controllers/adminUploadController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validate.js";
import { deleteProductUploadSchema } from "../schemas/adminUploadSchemas.js";

const router = Router();
const productImageUpload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: PRODUCT_UPLOAD_MAX_BYTES,
		files: PRODUCT_UPLOAD_MAX_FILES,
	},
});

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);

router.post(
	"/products",
	productImageUpload.array("images", PRODUCT_UPLOAD_MAX_FILES),
	asyncHandler(uploadAdminProductImagesController),
);
router.post(
	"/collections",
	productImageUpload.array("images", PRODUCT_UPLOAD_MAX_FILES),
	asyncHandler(uploadAdminCollectionImagesController),
);
router.delete(
	"/products",
	validateBody(deleteProductUploadSchema),
	asyncHandler(deleteAdminProductUploadController),
);
router.delete(
	"/collections",
	validateBody(deleteProductUploadSchema),
	asyncHandler(deleteAdminCollectionUploadController),
);

export default router;
