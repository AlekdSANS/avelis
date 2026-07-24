import { Router } from "express";
import rateLimit from "express-rate-limit";
import { loginController, logoutController, meController, registerController, } from "../controllers/authController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
const router = Router();
const loginRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many login attempts. Please try again later." },
});
const registerRateLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: "Too many registration attempts. Please try again later." },
});
router.post("/register", registerRateLimit, validateBody(registerSchema), asyncHandler(registerController));
router.post("/login", loginRateLimit, validateBody(loginSchema), asyncHandler(loginController));
router.post("/logout", asyncHandler(logoutController));
router.get("/me", asyncHandler(meController));
export default router;
//# sourceMappingURL=authRoutes.js.map