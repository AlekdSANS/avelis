import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { requestObservability } from "./middleware/requestObservability.js";
import { getDiagnosticsSnapshot, getMetricsSnapshot } from "./observability/metrics.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import continuityRoutes from "./routes/continuityRoutes.js";
import merchandisingRoutes from "./routes/merchandisingRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import seoRoutes from "./routes/seoRoutes.js";
import { UPLOAD_ROOT } from "./storage/localImageStorage.js";
import { logError } from "./observability/logger.js";
const app = express();
app.use(requestObservability);
function isAllowedClientOrigin(origin) {
    if (origin === undefined || origin === env.CLIENT_ORIGIN)
        return true;
    if (env.NODE_ENV === "production")
        return false;
    try {
        const url = new URL(origin);
        return ((url.protocol === "http:" || url.protocol === "https:") &&
            (url.hostname === "localhost" || url.hostname === "127.0.0.1"));
    }
    catch {
        return false;
    }
}
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors({
    origin: (origin, callback) => callback(null, isAllowedClientOrigin(origin)),
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
if (env.IMAGE_STORAGE_PROVIDER === "local") {
    app.use("/uploads", express.static(UPLOAD_ROOT, {
        dotfiles: "deny",
        fallthrough: true,
        index: false,
        maxAge: 0,
    }));
}
const startedAt = Date.now();
const liveHealthHandler = (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "avelis-api",
        version: env.SERVICE_VERSION,
        requestId: req.requestId,
        timestamp: new Date().toISOString(),
        uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
    });
};
app.get("/api/health", liveHealthHandler);
app.get("/api/health/live", liveHealthHandler);
app.get("/api/health/ready", async (req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.status(200).json({
            status: "ready",
            requestId: req.requestId,
            timestamp: new Date().toISOString(),
            checks: {
                database: "ok",
                storage: env.IMAGE_STORAGE_PROVIDER,
            },
        });
    }
    catch (error) {
        logError("health.readiness_failed", error, { requestId: req.requestId });
        res.status(503).json({
            status: "unavailable",
            requestId: req.requestId,
            timestamp: new Date().toISOString(),
            checks: { database: "failed" },
        });
    }
});
app.get("/api/health/metrics", (req, res) => {
    res.status(200).json({ status: "ok", requestId: req.requestId, data: getMetricsSnapshot() });
});
app.get("/api/health/diagnostics", (req, res) => {
    const configuredToken = env.OBSERVABILITY_TOKEN;
    const suppliedToken = req.header("authorization")?.replace(/^Bearer\s+/i, "");
    if (env.NODE_ENV === "production" && (!configuredToken || suppliedToken !== configuredToken)) {
        res.status(configuredToken ? 401 : 404).json({ message: configuredToken ? "Invalid diagnostics token" : "Not found", requestId: req.requestId });
        return;
    }
    res.status(200).json({ status: "ok", requestId: req.requestId, data: getDiagnosticsSnapshot() });
});
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/account/continuity", continuityRoutes);
app.use("/api/merchandising", merchandisingRoutes);
app.use("/api/seo", seoRoutes);
app.use("/api", (req, res) => {
    res.status(404).json({ message: "API route not found", requestId: req.requestId });
});
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map