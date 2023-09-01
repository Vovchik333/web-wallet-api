import { TransactionStatus } from "../../database/TransactionStatus";
import CardOperation, { OperationType } from "../../database/models/CardOperation";
import Transfer from "../../database/models/Transfer";
import * as cardOperationRepository from "../../database/repositories/card-operation.repository";
import * as transferRepository from "../../database/repositories/transfer.repository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export const processDeposit = async (deposit: CardOperation) => {
    deposit.type = OperationType.DEPOSIT;

    try {
        const { wallet_id, card_number, amount} = deposit;
        await cardOperationRepository.createDeposit(wallet_id, card_number, amount);
        
        deposit.status = TransactionStatus.COMPLETED;
        const transactionId = await cardOperationRepository.save(deposit);

        if(!transactionId) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
        }

        return transactionId;
    } catch(err) {
        deposit.status = TransactionStatus.FAILED;
        await cardOperationRepository.save(deposit);

        throw err;
    }
}

export const processTransfer = async (transfer: Transfer) => {
    try {
        const { from, to, amount } = transfer;

        await transferRepository.createTransfer(from, to, amount);

        transfer.status = TransactionStatus.COMPLETED;
        const transactionId = await transferRepository.save(transfer);

        if(!transactionId) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
        }

        return transactionId;
    } catch(err) {
        transfer.status = TransactionStatus.FAILED;
        await transferRepository.save(transfer);
        
        throw err;
    }
}

export const processWithdraw = async (withdraw: CardOperation) => { 
    withdraw.type = OperationType.WITHDRAW;

    try {
        const { wallet_id, card_number, amount} = withdraw;
        await cardOperationRepository.createWithdraw(wallet_id, card_number, amount);
        
        withdraw.status = TransactionStatus.COMPLETED;
        const transactionId = await cardOperationRepository.save(withdraw);

        if(!transactionId) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'transaction not created');
        }

        return transactionId;
    } catch(err) {
        withdraw.status = TransactionStatus.FAILED;
        await cardOperationRepository.save(withdraw);
        
        throw err;
    }
}