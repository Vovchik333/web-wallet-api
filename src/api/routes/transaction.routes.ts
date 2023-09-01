import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller";

const router = Router();

router.post('/deposit', transactionController.deposit);
router.post('/transfer', transactionController.transfer);
router.post('/withdraw', transactionController.withdraw);

export default router;