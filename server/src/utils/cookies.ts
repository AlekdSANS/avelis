import type { CookieOptions } from "express";
import { env } from "../config/env.js";
import { getSessionTtlMs } from "./session.js";

function isSecureDeployment() {
	return (
		env.NODE_ENV === "production" ||
		process.env.VERCEL === "1" ||
		process.env.VERCEL_ENV !== undefined
	);
}

export function getAuthCookieName() {
	if (env.SESSION_COOKIE_NAME !== undefined) {
		return env.SESSION_COOKIE_NAME;
	}

	return isSecureDeployment()
		? "__Secure-avelis_session"
		: "avelis_session";
}

export function getAuthCookieOptions(): CookieOptions {
	const secure = isSecureDeployment();

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
