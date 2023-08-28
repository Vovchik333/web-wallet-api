import { NextFunction, Request, Response } from "express";
import Wallet from "../../database/models/Wallet";
import { StatusHTTP } from "../StatusHTTP";
import WalletService from "../services/WalletService";

export default class WalletController {
    private walletService: WalletService;

    constructor() {
        this.walletService = new WalletService();
    }

    getWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const wallet: Wallet = await this.walletService.getOne(id);

            return res.status(StatusHTTP.OK).send(wallet);
        } catch(err) {
            next(err);
        }
    }

    createWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const wallet: Wallet = req.body;
            const id: string = await this.walletService.create(wallet);

            return res.status(StatusHTTP.OK).send({ id });
        } catch(err) {
            next(err);
        }
    }

    deleteWallet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            await this.walletService.deleteOne(id);

            return res.sendStatus(StatusHTTP.NO_CONTENT);
        } catch(err) {
            next(err);
        }
    }
}