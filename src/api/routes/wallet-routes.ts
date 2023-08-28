import { Router } from "express";
import WalletController from "../controllers/WalletController";

const router = Router();
const walletController = new WalletController();

router.route('/:id')
    .get(walletController.getWallet)
    .delete(walletController.deleteWallet);
router.route('/')
    .post(walletController.createWallet);

export default router;