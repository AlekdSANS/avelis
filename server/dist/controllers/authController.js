import { getAuthenticatedUserFromToken, loginUser, logoutSession, registerUser, } from "../services/authService.js";
import { getAuthCookieName, getAuthCookieOptions, getClearAuthCookieOptions, } from "../utils/cookies.js";
import { HttpError } from "../utils/httpError.js";
function getSessionCookie(req) {
    return req.cookies[getAuthCookieName()];
}
export async function registerController(req, res) {
    const input = res.locals.body;
    const result = await registerUser(input);
    res.cookie(getAuthCookieName(), result.sessionToken, getAuthCookieOptions());
    res.status(201).json({
        data: {
            user: result.user,
        },
    });
}
export async function loginController(req, res) {
    const input = res.locals.body;
    const result = await loginUser(input);
    res.cookie(getAuthCookieName(), result.sessionToken, getAuthCookieOptions());
    res.status(200).json({
        data: {
            user: result.user,
        },
    });
}
export async function logoutController(req, res) {
    await logoutSession(getSessionCookie(req));
    res.clearCookie(getAuthCookieName(), getClearAuthCookieOptions());
    res.status(200).json({
        data: {
            success: true,
        },
    });
}
export async function meController(req, res) {
    const auth = await getAuthenticatedUserFromToken(getSessionCookie(req));
    if (auth === null) {
        throw new HttpError(401, "Authentication required");
    }
    res.status(200).json({
        data: {
            user: auth.user,
        },
    });
}
//# sourceMappingURL=authController.js.map