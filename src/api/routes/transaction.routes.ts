import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller";
import { authorization } from "../../auth/authorization";
import { validate } from "../../validation/validator";
import { cardOperationSchema } from "../../validation/schemes/card-operation.schema";
import { transferSchema } from "../../validation/schemes/transfer.schema";

const router = Router();

router.post('/deposit', validate(cardOperationSchema), authorization, transactionController.deposit);
router.post('/transfer', validate(transferSchema), authorization, transactionController.transfer);
router.post('/withdraw', validate(cardOperationSchema), authorization, transactionController.withdraw);

export default router;