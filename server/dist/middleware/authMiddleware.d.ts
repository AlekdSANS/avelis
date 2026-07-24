import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../generated/prisma/enums.js";
export declare function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void>;
export declare function requireAuth(req: Request, _res: Response, next: NextFunction): void;
export declare function requireRole(...roles: UserRole[]): (req: Request, _res: Response, next: NextFunction) => void;
export declare const requireAdmin: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map