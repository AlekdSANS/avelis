import { getAuthenticatedUserFromToken } from "../services/authService.js";
import { getAuthCookieName } from "../utils/cookies.js";
import { HttpError } from "../utils/httpError.js";
function getSessionCookie(req) {
    return req.cookies[getAuthCookieName()];
}
export async function optionalAuth(req, _res, next) {
    try {
        const auth = await getAuthenticatedUserFromToken(getSessionCookie(req));
        if (auth !== null) {
            req.authUser = auth.user;
            req.authSessionId = auth.sessionId;
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
export function requireAuth(req, _res, next) {
    if (req.authUser === undefined) {
        next(new HttpError(401, "Authentication required"));
        return;
    }
    next();
}
export function requireRole(...roles) {
    return (req, _res, next) => {
        if (req.authUser === undefined) {
            next(new HttpError(401, "Authentication required"));
            return;
        }
        if (!roles.includes(req.authUser.role)) {
            next(new HttpError(403, "Forbidden"));
            return;
        }
        next();
    };
}
export const requireAdmin = requireRole("ADMIN");
//# sourceMappingURL=authMiddleware.js.map