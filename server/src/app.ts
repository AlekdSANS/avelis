import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(helmet());

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

app.get("/api/health", (_req, res) => {
	res.status(200).json({
		status: "ok",
		message: "Avelis API is running",
	});
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/collections", collectionRoutes);

app.use(errorHandler);

export default app;
