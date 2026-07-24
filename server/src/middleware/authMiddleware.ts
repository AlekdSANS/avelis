import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../generated/prisma/enums.js";
import { getAuthenticatedUserFromToken } from "../services/authService.js";
import { getAuthCookieName } from "../utils/cookies.js";
import { HttpError } from "../utils/httpError.js";

function getSessionCookie(req: Request) {
	return req.cookies[getAuthCookieName()] as string | undefined;
}

export async function optionalAuth(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	try {
		const auth = await getAuthenticatedUserFromToken(getSessionCookie(req));

		if (auth !== null) {
			req.authUser = auth.user;
			req.authSessionId = auth.sessionId;
		}

		next();
	} catch (error) {
		next(error);
	}
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
	if (req.authUser === undefined) {
		next(new HttpError(401, "Authentication required"));
		return;
	}

	next();
}

export function requireRole(...roles: UserRole[]) {
	return (req: Request, _res: Response, next: NextFunction) => {
		if (req.authUser === undefined) {
			next(new HttpError(401, "Authentication required"));
			return;
		}

		if (!roles.includes(req.authUser.role)) {
			next(new HttpError(403, "Forbidden"));
			return;
		}

		next();
	};
}

export const requireAdmin = requireRole("ADMIN");
