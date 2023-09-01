import { NextFunction, Request, Response } from "express";
import CardOperation, { OperationType } from "../../database/models/CardOperation";
import { StatusHTTP } from "../StatusHTTP";
import Transfer from "../../database/models/Transfer";
import * as transactionService from "../services/transaction.service";

export const deposit = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deposit: CardOperation = req.body;
        const id = await transactionService.processDeposit(deposit);

        return res.status(StatusHTTP.OK).send({ id });
    } catch(err) {
        next(err);
    }
}

export const transfer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transfer: Transfer = req.body;
        const id = await transactionService.processTransfer(transfer);

        return res.status(StatusHTTP.OK).send({ id });
    } catch(err) {
        next(err);
    }
}

export const withdraw = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const withdraw: CardOperation = req.body;
        const id = await transactionService.processWithdraw(withdraw);

        return res.status(StatusHTTP.OK).send({ id });
    } catch(err) {
        next(err);
    }
}