import { TransactionStatus } from "../../database/TransactionStatus";
import ICardOperationRepository from "../../database/interfaces/ICardOperationRepository";
import ITransferRepository from "../../database/interfaces/ITransferRepository";
import CardOperation, { OperationType } from "../../database/models/CardOperation";
import Transfer from "../../database/models/Transfer";
import CardOperationRepository from "../../database/repositories/CardOperationRepository";
import TransferRepository from "../../database/repositories/TransferRepository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export default class TransactionService {
    private cardOperationRepository: ICardOperationRepository;
    private transferRepository: ITransferRepository;

    constructor() {
        this.cardOperationRepository = new CardOperationRepository();
        this.transferRepository = new TransferRepository();
    }

    processDeposit = async (deposit: CardOperation) => {
        deposit.type = OperationType.DEPOSIT;

        try {
            const { wallet_id, card_number, amount} = deposit;
            await this.cardOperationRepository.createDeposit(wallet_id, card_number, amount);
            
            deposit.status = TransactionStatus.COMPLETED;
            const transactionId = await this.cardOperationRepository.save(deposit);

            if(!transactionId) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
            }

            return transactionId;
        } catch(err) {
            deposit.status = TransactionStatus.FAILED;
            await this.cardOperationRepository.save(deposit);

            throw err;
        }
    }

    processTransfer = async (transfer: Transfer) => {
        try {
            const { from, to, amount } = transfer;

            await this.transferRepository.createTransfer(from, to, amount);

            transfer.status = TransactionStatus.COMPLETED;
            const transactionId = await this.transferRepository.save(transfer);

            if(!transactionId) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
            }

            return transactionId;
        } catch(err) {
            transfer.status = TransactionStatus.FAILED;
            await this.transferRepository.save(transfer);
            
            throw err;
        }
    }

    processWithdraw = async (withdraw: CardOperation) => { 
        withdraw.type = OperationType.WITHDRAW;

        try {
            const { wallet_id, card_number, amount} = withdraw;
            await this.cardOperationRepository.createWithdraw(wallet_id, card_number, amount);
            
            withdraw.status = TransactionStatus.COMPLETED;
            const transactionId = await this.cardOperationRepository.save(withdraw);

            if(!transactionId) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
            }

            return transactionId;
        } catch(err) {
            withdraw.status = TransactionStatus.FAILED;
            await this.cardOperationRepository.save(withdraw);
            
            throw err;
        }
    }
}