import type { ErrorRequestHandler } from "express";
import multer from "multer";
import { ZodError } from "zod";
import { HttpError } from "../utils/httpError.js";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	if (error instanceof multer.MulterError) {
		const isSizeError = error.code === "LIMIT_FILE_SIZE";
		res.status(isSizeError ? 413 : 400).json({
			message: isSizeError
				? "Each image must be 8 MB or smaller"
				: "The image upload request is invalid",
		});
		return;
	}

	if (error instanceof ZodError) {
		res.status(400).json({
			message: "Invalid request parameters",
			issues: error.issues.map((issue) => ({
				path: issue.path.join("."),
				message: issue.message,
			})),
		});
		return;
	}

	if (error instanceof HttpError) {
		res.status(error.statusCode).json({ message: error.message });
		return;
	}

	if (process.env.NODE_ENV !== "production") {
		console.error(error);
	}

	res.status(500).json({ message: "Internal server error" });
};
