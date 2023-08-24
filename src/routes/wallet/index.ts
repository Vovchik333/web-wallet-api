import { Router } from "express";
import WalletController from "./WalletController";

const router = Router();
const walletController = new WalletController();

router.route('/:id')
    .get(walletController.getOne)
    .delete(walletController.deleteOne);
router.route('/')
    .post(walletController.create);

export default router;