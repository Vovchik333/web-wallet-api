import zod from "zod";

export const walletSchema = zod.object({
    id: zod.string().uuid().optional(),
    address: zod.string().uuid().optional(),
    user_id: zod.string().uuid(),
    balance: zod.number().positive(),
    currency: zod.string().max(3),
    createdAt: zod.date().optional(),
    updatedAt: zod.date().optional()
});