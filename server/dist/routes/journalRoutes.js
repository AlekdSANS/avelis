import { Router } from "express";
import { journalArticleController, listJournalController } from "../controllers/growthController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
const router = Router();
router.get("/", asyncHandler(listJournalController));
router.get("/:slug", asyncHandler(journalArticleController));
export default router;
//# sourceMappingURL=journalRoutes.js.map