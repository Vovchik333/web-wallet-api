import { Router } from "express";
import * as walletController from "../controllers/wallet.controller";

const router = Router();

router.route('/:id')
    .get(walletController.getWallet)
    .delete(walletController.deleteWallet);
router.route('/')
    .post(walletController.createWallet);

export default router;