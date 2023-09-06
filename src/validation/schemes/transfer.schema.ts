import zod from "zod";

export const transferSchema = zod.object({
    id: zod.string().uuid().optional(),
    from: zod.string().uuid(),
    to: zod.string().uuid(),
    amount: zod.number().positive(),
    status: zod.string().optional(),
    createdAt: zod.date().optional()
});