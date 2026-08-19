import { env } from "../config/env.js";
import { log, logError } from "./logger.js";
async function send(payload) {
    if (!env.OBSERVABILITY_WEBHOOK_URL)
        return;
    try {
        const response = await fetch(env.OBSERVABILITY_WEBHOOK_URL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ service: "avelis-api", version: env.SERVICE_VERSION, ...payload }),
            signal: AbortSignal.timeout(3_000),
        });
        if (!response.ok)
            log("warn", "observability.webhook_rejected", { statusCode: response.status });
    }
    catch (error) {
        logError("observability.webhook_failed", error);
    }
}
export function reportIncident(payload) {
    void send(payload);
}
//# sourceMappingURL=reporter.js.map