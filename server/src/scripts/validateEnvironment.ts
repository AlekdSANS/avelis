import { env } from "../config/env.js";

console.log(
	`Server environment valid (${env.NODE_ENV}, storage=${env.IMAGE_STORAGE_PROVIDER}).`,
);
