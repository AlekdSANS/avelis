import assert from "node:assert/strict";
import test from "node:test";
import { getAuthCookieOptions } from "../src/utils/cookies.js";

test("auth cookies are secure on Vercel even when NODE_ENV is not production", () => {
	const originalVercel = process.env.VERCEL;

	try {
		process.env.VERCEL = "1";

		assert.deepEqual(
			{
				httpOnly: getAuthCookieOptions().httpOnly,
				sameSite: getAuthCookieOptions().sameSite,
				secure: getAuthCookieOptions().secure,
			},
			{
				httpOnly: true,
				sameSite: "lax",
				secure: true,
			},
		);
	} finally {
		if (originalVercel === undefined) {
			delete process.env.VERCEL;
		} else {
			process.env.VERCEL = originalVercel;
		}
	}
});
