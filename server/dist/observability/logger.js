import { env } from "../config/env.js";
const weights = { debug: 10, info: 20, warn: 30, error: 40 };
function serializeError(error) {
    if (!(error instanceof Error))
        return { value: String(error) };
    return {
        name: error.name,
        message: error.message,
        ...(error.stack ? { stack: error.stack } : {}),
    };
}
export function log(level, event, fields = {}) {
    if (weights[level] < weights[env.LOG_LEVEL])
        return;
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
export function logError(event, error, fields = {}) {
    log("error", event, { ...fields, error: serializeError(error) });
}
//# sourceMappingURL=logger.js.map