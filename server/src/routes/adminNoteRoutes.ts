import { Router } from "express";
import {
	createAdminNoteController,
	deleteAdminNoteController,
	listAdminNotesController,
	updateAdminNoteController,
} from "../controllers/adminNoteController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
	optionalAuth,
	requireAdmin,
	requireAuth,
} from "../middleware/authMiddleware.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import {
	adminNoteCreateSchema,
	adminNoteListQuerySchema,
	adminNoteUpdateSchema,
} from "../schemas/adminNoteSchemas.js";

const router = Router();

router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);
router.get(
	"/",
	validateQuery(adminNoteListQuerySchema),
	asyncHandler(listAdminNotesController),
);
router.post(
	"/",
	validateBody(adminNoteCreateSchema),
	asyncHandler(createAdminNoteController),
);
router.patch(
	"/:id",
	validateBody(adminNoteUpdateSchema),
	asyncHandler(updateAdminNoteController),
);
router.delete("/:id", asyncHandler(deleteAdminNoteController));

export default router;
