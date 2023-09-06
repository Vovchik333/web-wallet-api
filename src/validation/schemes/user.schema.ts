import zod from "zod";

export const userSchema = zod.object({
    id: zod.string().uuid().optional(),
    name: zod.string().min(1).max(255),
    surname: zod.string().min(1).max(255),
    email: zod.string().email().max(254),
    password: zod.string().min(8).max(255),
    createdAt: zod.date().optional(),
    updatedAt: zod.date().optional()
});