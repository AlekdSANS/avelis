import type { SafeUser } from "../repositories/authRepository.js";

declare module "express-serve-static-core" {
	interface Request {
		authUser?: SafeUser;
		authSessionId?: string;
		requestId: string;
	}
}

export {};
