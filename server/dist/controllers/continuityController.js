import { getContinuity, mergeContinuity, replaceCart, replaceWishlist } from "../services/continuityService.js";
export async function getContinuityController(req, res) { res.json(await getContinuity(req.authUser.id)); }
export async function mergeContinuityController(req, res) { res.json(await mergeContinuity(req.authUser.id, res.locals.body)); }
export async function replaceCartController(req, res) { res.json(await replaceCart(req.authUser.id, res.locals.body)); }
export async function replaceWishlistController(req, res) { res.json(await replaceWishlist(req.authUser.id, res.locals.body)); }
//# sourceMappingURL=continuityController.js.map