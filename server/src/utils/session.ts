import { createHash, randomBytes } from "node:crypto";

const DEFAULT_SESSION_TTL_DAYS = 30;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function generateSessionToken() {
	return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
	return createHash("sha256").update(token).digest("hex");
}

export function getSessionTtlDays() {
	const rawValue = process.env.SESSION_TTL_DAYS;

	if (rawValue === undefined) {
		return DEFAULT_SESSION_TTL_DAYS;
	}

	const parsed = Number.parseInt(rawValue, 10);

	return Number.isFinite(parsed) && parsed > 0
		? parsed
		: DEFAULT_SESSION_TTL_DAYS;
}

export function getSessionTtlMs() {
	return getSessionTtlDays() * ONE_DAY_MS;
}

export function getSessionExpiresAt() {
	return new Date(Date.now() + getSessionTtlMs());
}
