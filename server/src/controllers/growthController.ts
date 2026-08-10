import type { Request, Response } from "express";
import type { JournalArticleInput, JournalArticleUpdateInput, ReviewCreateInput, ReviewModerationInput } from "../schemas/growthSchemas.js";
import { createArticle, deleteArticle, getPublishedArticle, listAdminArticles, listPublishedArticles, updateArticle } from "../services/journalService.js";
import { listAdminReviews, listProductReviews, moderateReview, submitProductReview } from "../services/reviewService.js";

export async function listJournalController(_req: Request, res: Response) { res.json(await listPublishedArticles()); }
export async function journalArticleController(req: Request, res: Response) { res.json(await getPublishedArticle(String(req.params.slug ?? ""))); }
export async function productReviewsController(req: Request, res: Response) { res.json(await listProductReviews(String(req.params.slug ?? ""))); }
export async function submitReviewController(req: Request, res: Response) { res.status(201).json(await submitProductReview(String(req.params.slug ?? ""), req.authUser!.id, res.locals.body as ReviewCreateInput)); }
export async function adminArticlesController(_req: Request, res: Response) { res.json(await listAdminArticles()); }
export async function createArticleController(_req: Request, res: Response) { res.status(201).json(await createArticle(res.locals.body as JournalArticleInput)); }
export async function updateArticleController(req: Request, res: Response) { res.json(await updateArticle(String(req.params.id ?? ""), res.locals.body as JournalArticleUpdateInput)); }
export async function deleteArticleController(req: Request, res: Response) { res.json(await deleteArticle(String(req.params.id ?? ""))); }
export async function adminReviewsController(_req: Request, res: Response) { res.json(await listAdminReviews()); }
export async function moderateReviewController(req: Request, res: Response) { res.json(await moderateReview(String(req.params.id ?? ""), res.locals.body as ReviewModerationInput)); }
