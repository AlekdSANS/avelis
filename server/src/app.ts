import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { UPLOAD_ROOT } from "./storage/localImageStorage.js";

const app = express();

app.use(
	helmet({
		crossOriginResourcePolicy: { policy: "cross-origin" },
	}),
);

app.use(
	cors({
		origin: env.CLIENT_ORIGIN,
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
if (env.IMAGE_STORAGE_PROVIDER === "local") {
	app.use(
		"/uploads",
		express.static(UPLOAD_ROOT, {
			dotfiles: "deny",
			fallthrough: true,
			index: false,
			maxAge: 0,
		}),
	);
}

const startedAt = Date.now();

const liveHealthHandler: express.RequestHandler = (_req, res) => {
	res.status(200).json({
		status: "ok",
		service: "avelis-api",
		uptimeSeconds: Math.floor((Date.now() - startedAt) / 1000),
	});
};

app.get("/api/health", liveHealthHandler);
app.get("/api/health/live", liveHealthHandler);
app.get("/api/health/ready", async (_req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		res.status(200).json({
			status: "ready",
			checks: {
				database: "ok",
				storage: env.IMAGE_STORAGE_PROVIDER,
			},
		});
	} catch {
		res.status(503).json({
			status: "unavailable",
			checks: { database: "failed" },
		});
	}
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/journal", journalRoutes);

app.use(errorHandler);

export default app;
