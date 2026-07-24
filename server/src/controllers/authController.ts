import type { Request, Response } from "express";
import {
	getAuthenticatedUserFromToken,
	loginUser,
	logoutSession,
	registerUser,
} from "../services/authService.js";
import type {
	LoginInput,
	RegisterInput,
} from "../schemas/authSchemas.js";
import {
	getAuthCookieName,
	getAuthCookieOptions,
	getClearAuthCookieOptions,
} from "../utils/cookies.js";
import { HttpError } from "../utils/httpError.js";

function getSessionCookie(req: Request) {
	return req.cookies[getAuthCookieName()] as string | undefined;
}

export async function registerController(req: Request, res: Response) {
	const input = res.locals.body as RegisterInput;
	const result = await registerUser(input);

	res.cookie(
		getAuthCookieName(),
		result.sessionToken,
		getAuthCookieOptions(),
	);

	res.status(201).json({
		data: {
			user: result.user,
		},
	});
}

export async function loginController(req: Request, res: Response) {
	const input = res.locals.body as LoginInput;
	const result = await loginUser(input);

	res.cookie(
		getAuthCookieName(),
		result.sessionToken,
		getAuthCookieOptions(),
	);

	res.status(200).json({
		data: {
			user: result.user,
		},
	});
}

export async function logoutController(req: Request, res: Response) {
	await logoutSession(getSessionCookie(req));

	res.clearCookie(getAuthCookieName(), getClearAuthCookieOptions());
	res.status(200).json({
		data: {
			success: true,
		},
	});
}

export async function meController(req: Request, res: Response) {
	const auth = await getAuthenticatedUserFromToken(getSessionCookie(req));

	if (auth === null) {
		throw new HttpError(401, "Authentication required");
	}

	res.status(200).json({
		data: {
			user: auth.user,
		},
	});
}
