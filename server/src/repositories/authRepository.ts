import type { Prisma } from "../generated/prisma/client.js";
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
} satisfies Prisma.UserSelect;

export const userWithPasswordSelect = {
	...safeUserSelect,
	passwordHash: true,
} satisfies Prisma.UserSelect;

export type SafeUser = Prisma.UserGetPayload<{
	select: typeof safeUserSelect;
}>;

export type UserWithPassword = Prisma.UserGetPayload<{
	select: typeof userWithPasswordSelect;
}>;

export type AuthenticatedSession = {
	id: string;
	expiresAt: Date;
	user: SafeUser;
};

export function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: { email },
		select: userWithPasswordSelect,
	});
}

export async function createUserWithSession(params: {
	email: string;
	firstName: string;
	lastName: string;
	passwordHash: string;
	tokenHash: string;
	expiresAt: Date;
}) {
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

export async function createSession(params: {
	userId: string;
	tokenHash: string;
	expiresAt: Date;
}) {
	await prisma.session.create({
		data: params,
	});
}

export function findSessionByTokenHash(tokenHash: string) {
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

export async function deleteSessionByTokenHash(tokenHash: string) {
	await prisma.session.deleteMany({
		where: { tokenHash },
	});
}

export async function deleteExpiredSessionByTokenHash(tokenHash: string) {
	await prisma.session.deleteMany({
		where: {
			tokenHash,
			expiresAt: { lte: new Date() },
		},
	});
}

export async function deleteExpiredSessionsForUser(userId: string) {
	await prisma.session.deleteMany({
		where: {
			userId,
			expiresAt: { lte: new Date() },
		},
	});
}
