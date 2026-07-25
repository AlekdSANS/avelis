import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
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
		origin:
			process.env.CLIENT_ORIGIN ??
			process.env.CLIENT_URL ??
			"http://localhost:5173",
		credentials: true,
	}),
);

app.use(express.json());
app.use(cookieParser());
app.use(
	"/uploads",
	express.static(UPLOAD_ROOT, {
		dotfiles: "deny",
		fallthrough: true,
		index: false,
		maxAge: process.env.NODE_ENV === "production" ? "7d" : 0,
	}),
);

app.get("/api/health", (_req, res) => {
	res.status(200).json({
		status: "ok",
		message: "Avelis API is running",
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

export default app;
