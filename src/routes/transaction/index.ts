import { Router } from "express";
import TransactionController from "./TransactionController";

const router = Router();
const transactionController = new TransactionController();

router.post('/deposit', transactionController.deposit);
router.post('/transfer', transactionController.transfer);
router.post('/withdraw', transactionController.withdraw);

export default router;