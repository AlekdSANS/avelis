import { getSessionTtlMs } from "./session.js";
export function getAuthCookieName() {
    if (process.env.SESSION_COOKIE_NAME !== undefined) {
        return process.env.SESSION_COOKIE_NAME;
    }
    return process.env.NODE_ENV === "production"
        ? "__Secure-avelis_session"
        : "avelis_session";
}
export function getAuthCookieOptions() {
    const secure = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        sameSite: "lax",
        secure,
        path: "/",
        maxAge: getSessionTtlMs(),
    };
}
export function getClearAuthCookieOptions() {
    const { maxAge: _maxAge, ...options } = getAuthCookieOptions();
    return options;
}
//# sourceMappingURL=cookies.js.map