import { Router } from "express";
import { robotsController, sitemapController } from "../controllers/seoController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = Router();

router.get("/sitemap.xml", asyncHandler(sitemapController));
router.get("/robots.txt", robotsController);

export default router;
