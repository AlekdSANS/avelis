import { env } from "../config/env.js";
import { log, logError } from "./logger.js";
import type { OperationCategory } from "./metrics.js";

type IncidentPayload = {
	category: OperationCategory;
	event: "exception" | "operation_failure";
	message: string;
	method: string;
	path: string;
	requestId: string;
	statusCode: number;
	timestamp: string;
};

async function send(payload: IncidentPayload) {
	if (!env.OBSERVABILITY_WEBHOOK_URL) return;
	try {
		const response = await fetch(env.OBSERVABILITY_WEBHOOK_URL, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ service: "avelis-api", version: env.SERVICE_VERSION, ...payload }),
			signal: AbortSignal.timeout(3_000),
		});
		if (!response.ok) log("warn", "observability.webhook_rejected", { statusCode: response.status });
	} catch (error) {
		logError("observability.webhook_failed", error);
	}
}

export function reportIncident(payload: IncidentPayload) {
	void send(payload);
}
