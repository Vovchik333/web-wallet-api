import { Router } from "express";
import auth from "./routes/auth.routes";
import user from "./routes/user.routes";
import wallet from "./routes/wallet.routes";
import transaction from "./routes/transaction.routes";

const router = Router();

router.use('/auth', auth);
router.use('/users', user);
router.use('/wallets', wallet);
router.use('/transactions', transaction);

export default router;