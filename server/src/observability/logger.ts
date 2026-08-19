import { env } from "../config/env.js";

export type LogLevel = "debug" | "info" | "warn" | "error";
export type LogFields = Record<string, unknown>;

const weights: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

function serializeError(error: unknown) {
	if (!(error instanceof Error)) return { value: String(error) };
	return {
		name: error.name,
		message: error.message,
		...(error.stack ? { stack: error.stack } : {}),
	};
}

export function log(level: LogLevel, event: string, fields: LogFields = {}) {
	if (weights[level] < weights[env.LOG_LEVEL]) return;
	const entry = JSON.stringify({
		timestamp: new Date().toISOString(),
		level,
		service: "avelis-api",
		version: env.SERVICE_VERSION,
		event,
		...fields,
	});
	(level === "error" ? console.error : console.log)(entry);
}

export function logError(event: string, error: unknown, fields: LogFields = {}) {
	log("error", event, { ...fields, error: serializeError(error) });
}
