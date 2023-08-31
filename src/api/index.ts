import { Router } from "express";
import user from "./routes/user-routes"
import wallet from "./routes/wallet-routes"
import transaction from "./routes/transaction-routes"
import auth from "./routes/auth-routes"

const router = Router();

router.use('/users', user);
router.use('/wallets', wallet);
router.use('/transactions', transaction);
router.use('/auth', auth);

export default router;