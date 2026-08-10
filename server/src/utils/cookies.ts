import type { CookieOptions } from "express";
import { env } from "../config/env.js";
import { getSessionTtlMs } from "./session.js";

export function getAuthCookieName() {
	if (env.SESSION_COOKIE_NAME !== undefined) {
		return env.SESSION_COOKIE_NAME;
	}

	return env.NODE_ENV === "production"
		? "__Secure-avelis_session"
		: "avelis_session";
}

export function getAuthCookieOptions(): CookieOptions {
	const secure = env.NODE_ENV === "production";

	return {
		httpOnly: true,
		sameSite: "lax",
		secure,
		path: "/",
		maxAge: getSessionTtlMs(),
	};
}

export function getClearAuthCookieOptions(): CookieOptions {
	const { maxAge: _maxAge, ...options } = getAuthCookieOptions();

	return options;
}
