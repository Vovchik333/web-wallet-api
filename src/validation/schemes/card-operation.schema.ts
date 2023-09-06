import zod from "zod";

export const cardOperationSchema = zod.object({
    id: zod.string().uuid().optional(),
    wallet_id: zod.string().uuid(),
    card_number: zod.string().max(29),
    type: zod.string().optional(),
    amount: zod.number().positive(),
    status: zod.string().optional(),
    createdAt: zod.date().optional()
});