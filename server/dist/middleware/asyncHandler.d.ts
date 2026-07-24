import type { NextFunction, Request, Response } from "express";
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare function asyncHandler(handler: AsyncRequestHandler): (req: Request, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=asyncHandler.d.ts.map