import { Router } from "express";
import { getContinuityController, mergeContinuityController, replaceCartController, replaceWishlistController } from "../controllers/continuityController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { optionalAuth, requireAuth } from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validate.js";
import { cartReplaceSchema, continuityMergeSchema, wishlistReplaceSchema } from "../schemas/continuitySchemas.js";
const router = Router();
router.use(asyncHandler(optionalAuth), requireAuth);
router.get("/", asyncHandler(getContinuityController));
router.post("/merge", validateBody(continuityMergeSchema), asyncHandler(mergeContinuityController));
router.put("/cart", validateBody(cartReplaceSchema), asyncHandler(replaceCartController));
router.put("/wishlist", validateBody(wishlistReplaceSchema), asyncHandler(replaceWishlistController));
export default router;
//# sourceMappingURL=continuityRoutes.js.map