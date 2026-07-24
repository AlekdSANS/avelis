import { createSession, createUserWithSession, deleteExpiredSessionByTokenHash, deleteExpiredSessionsForUser, deleteSessionByTokenHash, findSessionByTokenHash, findUserByEmail, } from "../repositories/authRepository.js";
import { HttpError } from "../utils/httpError.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { generateSessionToken, getSessionExpiresAt, hashSessionToken, } from "../utils/session.js";
const DUPLICATE_EMAIL_MESSAGE = "An account with this email already exists";
const INVALID_CREDENTIALS_MESSAGE = "Invalid email or password";
function normalizeEmail(email) {
    return email.trim().toLowerCase();
}
function isUniqueConstraintError(error) {
    return (typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002");
}
function createSessionMaterial() {
    const token = generateSessionToken();
    return {
        token,
        tokenHash: hashSessionToken(token),
        expiresAt: getSessionExpiresAt(),
    };
}
export async function registerUser(input) {
    const email = normalizeEmail(input.email);
    const existingUser = await findUserByEmail(email);
    if (existingUser !== null) {
        throw new HttpError(409, DUPLICATE_EMAIL_MESSAGE);
    }
    const passwordHash = await hashPassword(input.password);
    const session = createSessionMaterial();
    try {
        const user = await createUserWithSession({
            email,
            firstName: input.firstName,
            lastName: input.lastName,
            passwordHash,
            tokenHash: session.tokenHash,
            expiresAt: session.expiresAt,
        });
        return {
            user,
            sessionToken: session.token,
        };
    }
    catch (error) {
        if (isUniqueConstraintError(error)) {
            throw new HttpError(409, DUPLICATE_EMAIL_MESSAGE);
        }
        throw error;
    }
}
export async function loginUser(input) {
    const email = normalizeEmail(input.email);
    const user = await findUserByEmail(email);
    if (user === null) {
        throw new HttpError(401, INVALID_CREDENTIALS_MESSAGE);
    }
    const isValidPassword = await verifyPassword(input.password, user.passwordHash);
    if (!isValidPassword) {
        throw new HttpError(401, INVALID_CREDENTIALS_MESSAGE);
    }
    await deleteExpiredSessionsForUser(user.id);
    const session = createSessionMaterial();
    await createSession({
        userId: user.id,
        tokenHash: session.tokenHash,
        expiresAt: session.expiresAt,
    });
    const { passwordHash: _passwordHash, ...safeUser } = user;
    return {
        user: safeUser,
        sessionToken: session.token,
    };
}
export async function logoutSession(sessionToken) {
    if (sessionToken === undefined || sessionToken.length === 0) {
        return;
    }
    await deleteSessionByTokenHash(hashSessionToken(sessionToken));
}
export async function getAuthenticatedUserFromToken(sessionToken) {
    if (sessionToken === undefined || sessionToken.length === 0) {
        return null;
    }
    const tokenHash = hashSessionToken(sessionToken);
    const session = await findSessionByTokenHash(tokenHash);
    if (session === null) {
        return null;
    }
    if (session.expiresAt <= new Date()) {
        await deleteExpiredSessionByTokenHash(tokenHash);
        return null;
    }
    return {
        sessionId: session.id,
        user: session.user,
    };
}
//# sourceMappingURL=authService.js.map