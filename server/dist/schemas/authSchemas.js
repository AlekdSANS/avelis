import { z } from "zod";
const nameSchema = z.string().trim().min(1).max(80);
const passwordSchema = z.string().min(8).max(128);
export const registerSchema = z.object({
    email: z.string().trim().email().max(254),
    password: passwordSchema,
    firstName: nameSchema,
    lastName: nameSchema,
});
export const loginSchema = z.object({
    email: z.string().trim().email().max(254),
    password: passwordSchema,
});
//# sourceMappingURL=authSchemas.js.map