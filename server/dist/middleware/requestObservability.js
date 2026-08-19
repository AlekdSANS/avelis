import { randomUUID } from "node:crypto";
import { log } from "../observability/logger.js";
import { classifyOperation, recordFailure, recordRequest } from "../observability/metrics.js";
import { reportIncident } from "../observability/reporter.js";
function requestIdFromHeader(req) {
    const candidate = req.header("x-request-id")?.trim();
    return candidate && /^[A-Za-z0-9._:-]{8,128}$/.test(candidate) ? candidate : randomUUID();
}
export function requestObservability(req, res, next) {
    const startedAt = performance.now();
    const requestId = requestIdFromHeader(req);
    const requestPath = req.originalUrl.split("?", 1)[0] || req.path;
    req.requestId = requestId;
    res.setHeader("X-Request-ID", requestId);
    recordRequest();
    res.on("finish", () => {
        const durationMs = Math.round((performance.now() - startedAt) * 100) / 100;
        const category = classifyOperation(requestPath);
        const fields = {
            requestId,
            method: req.method,
            path: requestPath,
            statusCode: res.statusCode,
            durationMs,
            category,
            userId: req.authUser?.id,
        };
        log(res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info", "http.request_completed", fields);
        if (res.statusCode >= 400) {
            const failure = { ...fields, timestamp: new Date().toISOString() };
            recordFailure(failure);
            if (res.statusCode >= 500 || (category === "payment" && res.statusCode >= 400)) {
                reportIncident({
                    category,
                    event: "operation_failure",
                    message: `${req.method} ${requestPath} returned ${res.statusCode}`,
                    method: req.method,
                    path: requestPath,
                    requestId,
                    statusCode: res.statusCode,
                    timestamp: failure.timestamp,
                });
            }
        }
    });
    next();
}
//# sourceMappingURL=requestObservability.js.map