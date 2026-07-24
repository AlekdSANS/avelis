import type { Prisma } from "../generated/prisma/client.js";
import { UserRole } from "../generated/prisma/enums.js";
export declare const safeUserSelect: {
    id: true;
    email: true;
    firstName: true;
    lastName: true;
    role: true;
    createdAt: true;
    updatedAt: true;
};
export declare const userWithPasswordSelect: {
    id: true;
    email: true;
    firstName: true;
    lastName: true;
    role: true;
    createdAt: true;
    updatedAt: true;
    passwordHash: true;
};
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
export declare function findUserByEmail(email: string): Prisma.Prisma__UserClient<{
    createdAt: Date;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    passwordHash: string;
    role: UserRole;
    updatedAt: Date;
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function createUserWithSession(params: {
    email: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    tokenHash: string;
    expiresAt: Date;
}): Promise<{
    createdAt: Date;
    email: string;
    firstName: string;
    id: string;
    lastName: string;
    role: UserRole;
    updatedAt: Date;
}>;
export declare function createSession(params: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
}): Promise<void>;
export declare function findSessionByTokenHash(tokenHash: string): Prisma.Prisma__SessionClient<{
    expiresAt: Date;
    id: string;
    user: {
        createdAt: Date;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        role: UserRole;
        updatedAt: Date;
    };
} | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
    omit: Prisma.GlobalOmitConfig | undefined;
}>;
export declare function deleteSessionByTokenHash(tokenHash: string): Promise<void>;
export declare function deleteExpiredSessionByTokenHash(tokenHash: string): Promise<void>;
export declare function deleteExpiredSessionsForUser(userId: string): Promise<void>;
//# sourceMappingURL=authRepository.d.ts.map