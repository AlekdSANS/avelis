import { createArticle, deleteArticle, getPublishedArticle, listAdminArticles, listPublishedArticles, updateArticle } from "../services/journalService.js";
import { listAdminReviews, listProductReviews, moderateReview, submitProductReview } from "../services/reviewService.js";
export async function listJournalController(_req, res) { res.json(await listPublishedArticles()); }
export async function journalArticleController(req, res) { res.json(await getPublishedArticle(String(req.params.slug ?? ""))); }
export async function productReviewsController(req, res) { res.json(await listProductReviews(String(req.params.slug ?? ""))); }
export async function submitReviewController(req, res) { res.status(201).json(await submitProductReview(String(req.params.slug ?? ""), req.authUser.id, res.locals.body)); }
export async function adminArticlesController(_req, res) { res.json(await listAdminArticles()); }
export async function createArticleController(_req, res) { res.status(201).json(await createArticle(res.locals.body)); }
export async function updateArticleController(req, res) { res.json(await updateArticle(String(req.params.id ?? ""), res.locals.body)); }
export async function deleteArticleController(req, res) { res.json(await deleteArticle(String(req.params.id ?? ""))); }
export async function adminReviewsController(_req, res) { res.json(await listAdminReviews()); }
export async function moderateReviewController(req, res) { res.json(await moderateReview(String(req.params.id ?? ""), res.locals.body)); }
//# sourceMappingURL=growthController.js.map