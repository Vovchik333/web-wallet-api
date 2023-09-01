import { ResultSetHeader } from "mysql2";
import { execute, pool } from "../connector";
import CardOperation from "../models/CardOperation";
import { isolationLevelQueries } from "../queries/isolation-level.queries";
import { cardOperationQueries } from "../queries/card-operation.queries";
import { randomUUID } from "crypto";
import * as walletRepository from "./wallet.repository";

export const save = async (operation: CardOperation): Promise<string | undefined> => {
    operation.id = randomUUID();

    const result = await execute<ResultSetHeader>(
        cardOperationQueries.save, 
        [operation.id, operation.wallet_id, operation.card_number, operation.type, operation.amount, operation.currency, operation.status]
    );

    if(result.affectedRows < 1) {
        return undefined;
    }

    return operation.id;
}

export const createDeposit = async (wallet_id: string, card_number: string, amount: number): Promise<void> => {
    const connection = await pool.getConnection();

    try {
        await execute<ResultSetHeader>(isolationLevelQueries.readCommitted);
        await connection.beginTransaction();

        const toWallet = await walletRepository.findByAddress(wallet_id);

        if(!toWallet) {
            throw new Error('to_wallet not found.');
        }

        await walletRepository.updateBalance(toWallet.address, amount);

        await connection.commit();
    } catch(err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

export const createWithdraw = async (wallet_id: string, card_number: string, amount: number): Promise<void> => {
    const connection = await pool.getConnection();

    try {
        await execute<ResultSetHeader>(isolationLevelQueries.readCommitted);
        await connection.beginTransaction();

        const fromWallet = await walletRepository.findByAddress(wallet_id);

        if(!fromWallet) {
            throw new Error('from_wallet not found.');
        }
        if(fromWallet.balance < amount) {
            throw new Error('insufficient funds on the wallet balance.');
        }

        await walletRepository.updateBalance(fromWallet.address, -amount);

        await connection.commit();
    } catch(err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}