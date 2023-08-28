import { NextFunction, Request, Response } from "express";
import CardOperation, { OperationType } from "../../database/models/CardOperation";
import { StatusHTTP } from "../StatusHTTP";
import Transfer from "../../database/models/Transfer";
import TransactionService from "../services/TransactionService";

export default class TransactionController {
    private transactionService: TransactionService;

    constructor() {
        this.transactionService = new TransactionService();
    }

    deposit = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const deposit: CardOperation = req.body;
            const id = await this.transactionService.processDeposit(deposit);

            return res.status(StatusHTTP.OK).send({ id });
        } catch(err) {
            next(err);
        }
    }

    transfer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const transfer: Transfer = req.body;
            const id = await this.transactionService.processTransfer(transfer);

            return res.status(StatusHTTP.OK).send({ id });
        } catch(err) {
            next(err);
        }
    }

    withdraw = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const withdraw: CardOperation = req.body;
            const id = await this.transactionService.processWithdraw(withdraw);

            return res.status(StatusHTTP.OK).send({ id });
        } catch(err) {
            next(err);
        }
    }
}