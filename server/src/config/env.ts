import "dotenv/config";

import { z } from "zod";

const optionalUrl = z.preprocess(
	(value) => (value === "" ? undefined : value),
	z.url().optional(),
);

const optionalText = z.preprocess(
	(value) => (value === "" ? undefined : value),
	z.string().trim().min(1).optional(),
);

const booleanFromEnvironment = z.preprocess((value) => {
	if (typeof value !== "string") return value;
	if (value.toLowerCase() === "true") return true;
	if (value.toLowerCase() === "false") return false;
	return value;
}, z.boolean());

const environmentSchema = z
	.object({
		NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
		PORT: z.coerce.number().int().positive().max(65_535).default(4000),
		DATABASE_URL: z.string().trim().min(1, "DATABASE_URL is required"),
		CLIENT_ORIGIN: optionalUrl,
		SESSION_COOKIE_NAME: optionalText,
		SESSION_TTL_DAYS: z.coerce.number().int().positive().max(365).default(30),
		IMAGE_STORAGE_PROVIDER: z.enum(["local", "s3"]).optional(),
		S3_ENDPOINT: optionalUrl,
		S3_REGION: optionalText,
		S3_BUCKET: optionalText,
		S3_ACCESS_KEY_ID: optionalText,
		S3_SECRET_ACCESS_KEY: optionalText,
		S3_PUBLIC_BASE_URL: optionalUrl,
		S3_FORCE_PATH_STYLE: booleanFromEnvironment.default(false),
	})
	.superRefine((value, context) => {
		const storageProvider =
			value.IMAGE_STORAGE_PROVIDER ??
			(value.NODE_ENV === "production" ? "s3" : "local");

		if (value.NODE_ENV === "production" && value.CLIENT_ORIGIN === undefined) {
			context.addIssue({
				code: "custom",
				path: ["CLIENT_ORIGIN"],
				message: "CLIENT_ORIGIN is required in production",
			});
		}

		if (value.NODE_ENV === "production" && storageProvider !== "s3") {
			context.addIssue({
				code: "custom",
				path: ["IMAGE_STORAGE_PROVIDER"],
				message: "Production must use s3 object storage",
			});
		}

		if (storageProvider === "s3") {
			for (const key of [
				"S3_REGION",
				"S3_BUCKET",
				"S3_ACCESS_KEY_ID",
				"S3_SECRET_ACCESS_KEY",
				"S3_PUBLIC_BASE_URL",
			] as const) {
				if (value[key] === undefined) {
					context.addIssue({
						code: "custom",
						path: [key],
						message: `${key} is required when IMAGE_STORAGE_PROVIDER=s3`,
					});
				}
			}
		}
	});

const parsedEnvironment = environmentSchema.safeParse(process.env);

if (!parsedEnvironment.success) {
	const details = parsedEnvironment.error.issues
		.map((issue) => `- ${issue.path.join(".") || "environment"}: ${issue.message}`)
		.join("\n");

	throw new Error(`Invalid server environment configuration:\n${details}`);
}

const values = parsedEnvironment.data;

export const env = Object.freeze({
	...values,
	CLIENT_ORIGIN: values.CLIENT_ORIGIN ?? "http://localhost:5173",
	IMAGE_STORAGE_PROVIDER:
		values.IMAGE_STORAGE_PROVIDER ??
		(values.NODE_ENV === "production" ? "s3" : "local"),
});

export type ServerEnvironment = typeof env;
