import { Router } from "express";
import { createAdminCollectionController, deleteAdminCollectionController, getAdminCollectionController, listAdminCollectionsController, updateAdminCollectionController, } from "../controllers/adminCollectionController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { optionalAuth, requireAdmin, requireAuth, } from "../middleware/authMiddleware.js";
import { validateBody, validateQuery } from "../middleware/validate.js";
import { adminCollectionCreateSchema, adminCollectionListQuerySchema, adminCollectionUpdateSchema, } from "../schemas/adminCollectionSchemas.js";
const router = Router();
router.use(asyncHandler(optionalAuth), requireAuth, requireAdmin);
router.get("/", validateQuery(adminCollectionListQuerySchema), asyncHandler(listAdminCollectionsController));
router.get("/:id", asyncHandler(getAdminCollectionController));
router.post("/", validateBody(adminCollectionCreateSchema), asyncHandler(createAdminCollectionController));
router.patch("/:id", validateBody(adminCollectionUpdateSchema), asyncHandler(updateAdminCollectionController));
router.delete("/:id", asyncHandler(deleteAdminCollectionController));
export default router;
//# sourceMappingURL=adminCollectionRoutes.js.map