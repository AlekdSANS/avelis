import multer from "multer";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";
import { classifyOperation } from "../observability/metrics.js";
import { log, logError } from "../observability/logger.js";
import { reportIncident } from "../observability/reporter.js";
export const errorHandler = (error, req, res, _next) => {
    const requestId = req.requestId;
    const safePath = req.originalUrl.split("?", 1)[0] || req.path;
    if (error instanceof multer.MulterError) {
        const isSizeError = error.code === "LIMIT_FILE_SIZE";
        const statusCode = isSizeError ? 413 : 400;
        log("warn", "http.upload_rejected", { requestId, method: req.method, path: safePath, statusCode, code: error.code });
        res.status(statusCode).json({
            message: isSizeError
                ? "Each image must be 8 MB or smaller"
                : "The image upload request is invalid",
            requestId,
        });
        return;
    }
    if (error instanceof ZodError) {
        log("warn", "http.validation_rejected", {
            requestId,
            method: req.method,
            path: safePath,
            statusCode: 400,
            issuePaths: error.issues.map((issue) => issue.path.join(".")),
        });
        res.status(400).json({
            message: "Invalid request parameters",
            issues: error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message,
            })),
            requestId,
        });
        return;
    }
    if (error instanceof HttpError) {
        log("warn", "http.operation_rejected", {
            requestId,
            method: req.method,
            path: safePath,
            statusCode: error.statusCode,
            message: error.message,
        });
        res.status(error.statusCode).json({ message: error.message, requestId });
        return;
    }
    const category = classifyOperation(safePath);
    logError("http.unhandled_exception", error, { requestId, method: req.method, path: safePath, category });
    reportIncident({
        category,
        event: "exception",
        message: error instanceof Error ? error.message : "Unknown server exception",
        method: req.method,
        path: safePath,
        requestId,
        statusCode: 500,
        timestamp: new Date().toISOString(),
    });
    res.status(500).json({ message: "Internal server error", requestId });
};
//# sourceMappingURL=errorMiddleware.js.map