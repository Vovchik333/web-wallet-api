import { ResultSetHeader } from "mysql2";
import { execute, pool } from "..";
import CardOperation from "../models/CardOperation";
import { isolationLevelQueries } from "../queries/isolation-level-queries";
import { cardOperationQueries } from "../queries/card-operation-queries";
import { randomUUID } from "crypto";
import WalletRepository from "./WalletRepository";
import ICardOperationRepository from "../interfaces/ICardOperationRepository";

export default class CardOperationRepository implements ICardOperationRepository {
    async save(operation: CardOperation): Promise<string | undefined> {
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

    async createDeposit(wallet_id: string, card_number: string, amount: number): Promise<void> {
        const walletRepository = new WalletRepository();
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

    async createWithdraw(wallet_id: string, card_number: string, amount: number): Promise<void> {
        const walletRepository = new WalletRepository();
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
}