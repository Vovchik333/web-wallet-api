import { NextFunction, Request, Response } from "express";
import Wallet from "../../database/models/Wallet";
import { StatusHTTP } from "../StatusHTTP";
import * as walletService from "../services/wallet.service";

export const getWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const wallet: Wallet = await walletService.getOne(id);

        return res.status(StatusHTTP.OK).send(wallet);
    } catch(err) {
        next(err);
    }
}

export const createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wallet: Wallet = req.body;
        const id: string = await walletService.create(wallet);

        return res.status(StatusHTTP.OK).send({ id });
    } catch(err) {
        next(err);
    }
}

export const deleteWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        await walletService.deleteOne(id);

        return res.sendStatus(StatusHTTP.NO_CONTENT);
    } catch(err) {
        next(err);
    }
}