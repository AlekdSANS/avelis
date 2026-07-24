import { Router } from "express";
import {
	collectionBySlugController,
	listCollectionsController,
} from "../controllers/collectionController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(listCollectionsController));
router.get("/:slug", asyncHandler(collectionBySlugController));

export default router;
