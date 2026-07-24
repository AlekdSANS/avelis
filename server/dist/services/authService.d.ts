import { type SafeUser } from "../repositories/authRepository.js";
import type { LoginInput, RegisterInput } from "../schemas/authSchemas.js";
export type AuthResult = {
    user: SafeUser;
    sessionToken: string;
};
export declare function registerUser(input: RegisterInput): Promise<AuthResult>;
export declare function loginUser(input: LoginInput): Promise<AuthResult>;
export declare function logoutSession(sessionToken: string | undefined): Promise<void>;
export declare function getAuthenticatedUserFromToken(sessionToken: string | undefined): Promise<{
    sessionId: string;
    user: {
        createdAt: Date;
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        updatedAt: Date;
    };
} | null>;
//# sourceMappingURL=authService.d.ts.map