import { createHash, randomBytes } from "node:crypto";
import { env } from "../config/env.js";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function generateSessionToken() {
	return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string) {
	return createHash("sha256").update(token).digest("hex");
}

export function getSessionTtlDays() {
	return env.SESSION_TTL_DAYS;
}

export function getSessionTtlMs() {
	return getSessionTtlDays() * ONE_DAY_MS;
}

export function getSessionExpiresAt() {
	return new Date(Date.now() + getSessionTtlMs());
}
