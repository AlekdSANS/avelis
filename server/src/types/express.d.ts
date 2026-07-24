import type { SafeUser } from "../repositories/authRepository.js";

declare global {
	namespace Express {
		interface Request {
			authUser?: SafeUser;
			authSessionId?: string;
		}
	}
}

export {};
