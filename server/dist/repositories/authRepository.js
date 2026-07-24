import { UserRole } from "../generated/prisma/enums.js";
import { prisma } from "../lib/prisma.js";
export const safeUserSelect = {
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    role: true,
    createdAt: true,
    updatedAt: true,
};
export const userWithPasswordSelect = {
    ...safeUserSelect,
    passwordHash: true,
};
export function findUserByEmail(email) {
    return prisma.user.findUnique({
        where: { email },
        select: userWithPasswordSelect,
    });
}
export async function createUserWithSession(params) {
    return prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                passwordHash: params.passwordHash,
                role: UserRole.USER,
            },
            select: safeUserSelect,
        });
        await tx.session.create({
            data: {
                userId: user.id,
                tokenHash: params.tokenHash,
                expiresAt: params.expiresAt,
            },
        });
        return user;
    });
}
export async function createSession(params) {
    await prisma.session.create({
        data: params,
    });
}
export function findSessionByTokenHash(tokenHash) {
    return prisma.session.findUnique({
        where: { tokenHash },
        select: {
            id: true,
            expiresAt: true,
            user: {
                select: safeUserSelect,
            },
        },
    });
}
export async function deleteSessionByTokenHash(tokenHash) {
    await prisma.session.deleteMany({
        where: { tokenHash },
    });
}
export async function deleteExpiredSessionByTokenHash(tokenHash) {
    await prisma.session.deleteMany({
        where: {
            tokenHash,
            expiresAt: { lte: new Date() },
        },
    });
}
export async function deleteExpiredSessionsForUser(userId) {
    await prisma.session.deleteMany({
        where: {
            userId,
            expiresAt: { lte: new Date() },
        },
    });
}
//# sourceMappingURL=authRepository.js.map