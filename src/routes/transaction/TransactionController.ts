import { Request, Response } from "express";
import CardOperation, { OperationType } from "../../database/models/CardOperation";
import ICardOperationRepository from "../../database/interfaces/ICardOperationRepository";
import CardOperationRepository from "../../database/repositories/CardOperationRepository";
import ITransferRepository from "../../database/interfaces/ITransferRepository";
import TransferRepository from "../../database/repositories/TransferRepository";
import { StatusHTTP } from "../Status.HTTP";
import Transfer from "../../database/models/Transfer";
import { TransactionStatus } from "../../database/TransactionStatus";

export default class TransactionController {
    private cardOperationRepository: ICardOperationRepository;
    private transferRepository: ITransferRepository;

    constructor() {
        this.cardOperationRepository = new CardOperationRepository();
        this.transferRepository = new TransferRepository();
        this.deposit = this.deposit.bind(this);
        this.transfer = this.transfer.bind(this);
        this.withdraw = this.withdraw.bind(this);
    }

    public async deposit(req: Request, res: Response) {
        const deposit: CardOperation = req.body;
        const { wallet_id, card_number, amount} = deposit;
        deposit.type = OperationType.DEPOSIT;

        try {
            await this.cardOperationRepository.createDeposit(wallet_id, card_number, amount);
            
            deposit.status = TransactionStatus.COMPLETED;
            res.status(StatusHTTP.OK);
        } catch(err) {
            deposit.status = TransactionStatus.FAILED;
            res.status(StatusHTTP.BAD_REQUEST);
            console.log(err);
        }

        const cardOperation = await this.cardOperationRepository.save(deposit);
        res.send({cardOperation});
    }

    public async transfer(req: Request, res: Response) {
        const transfer: Transfer = req.body;
        const { from, to, amount } = transfer;

        try {
            await this.transferRepository.createTransfer(from, to, amount);

            transfer.status = TransactionStatus.COMPLETED;
            res.status(StatusHTTP.OK);
        } catch(err) {
            transfer.status = TransactionStatus.FAILED;
            res.status(StatusHTTP.BAD_REQUEST);
            console.log(err);
        }

        await this.transferRepository.save(transfer);
        res.send({transfer});
    }

    public async withdraw(req: Request, res: Response) {
        const withdraw: CardOperation = req.body;
        const { wallet_id, card_number, amount} = withdraw;
        withdraw.type = OperationType.WITHDRAW;

        try {
            await this.cardOperationRepository.createWithdraw(wallet_id, card_number, amount);
            
            withdraw.status = TransactionStatus.COMPLETED;
            res.status(StatusHTTP.OK);
        } catch(err) {
            withdraw.status = TransactionStatus.FAILED;
            res.status(StatusHTTP.BAD_REQUEST);
            console.log(err);
        }

        const cardOperation = await this.cardOperationRepository.save(withdraw);
        res.send({cardOperation});
    }
}