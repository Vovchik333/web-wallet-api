import { Router } from "express";
import user from "./user"
import wallet from "./wallet"
import transaction from "./transaction"

const router = Router();

router.use('/users', user);
router.use('/wallets', wallet);
router.use('/transactions', transaction);

export default router;