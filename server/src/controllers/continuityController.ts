import type { Request, Response } from "express";
import type { CartReplaceInput, ContinuityMergeInput, WishlistReplaceInput } from "../schemas/continuitySchemas.js";
import { getContinuity, mergeContinuity, replaceCart, replaceWishlist } from "../services/continuityService.js";
export async function getContinuityController(req: Request, res: Response) { res.json(await getContinuity(req.authUser!.id)); }
export async function mergeContinuityController(req: Request, res: Response) { res.json(await mergeContinuity(req.authUser!.id, res.locals.body as ContinuityMergeInput)); }
export async function replaceCartController(req: Request, res: Response) { res.json(await replaceCart(req.authUser!.id, res.locals.body as CartReplaceInput)); }
export async function replaceWishlistController(req: Request, res: Response) { res.json(await replaceWishlist(req.authUser!.id, res.locals.body as WishlistReplaceInput)); }
