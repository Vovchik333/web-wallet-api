import { Router } from "express";
import * as walletController from "../controllers/wallet.controller";
import { authorization } from "../../auth/authorization";
import { validate } from "../../validation/validator";
import { walletSchema } from "../../validation/schemes/wallet.schema";

const router = Router();

router.route('/:id')
    .get(authorization, walletController.getWallet)
    .delete(authorization, walletController.deleteWallet);
router.route('/')
    .post(validate(walletSchema), authorization, walletController.createWallet);

export default router;