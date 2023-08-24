import { ResultSetHeader } from "mysql2";
import { execute, pool } from "..";
import Transfer from "../models/Transfer";
import { isolationLevelQueries } from "../queries/isolation-level-queries";
import WalletRepository from "./WalletRepository";
import { transferQueries } from "../queries/transfer-queries";
import { randomUUID } from "crypto";
import ITransferRepository from "../interfaces/ITransferRepository";

export default class TransferRepository implements ITransferRepository {
    async save(transfer: Transfer): Promise<string | undefined> {
        transfer.id = randomUUID();

        const result =  await execute<ResultSetHeader>(
            transferQueries.save, 
            [transfer.id, transfer.from, transfer.to, transfer.amount, transfer.status]
        );

        if(result.affectedRows < 1) {
            return undefined;
        }

        return transfer.id;
    }

    async createTransfer(from: string, to: string, amount: number): Promise<void> {
        const walletRepository = new WalletRepository();
        const connection = await pool.getConnection();

        try {
            await execute<ResultSetHeader>(isolationLevelQueries.readCommitted);
            await connection.beginTransaction();

            const fromWallet = await walletRepository.findByAddress(from);
            const toWallet = await walletRepository.findByAddress(to);

            if(!fromWallet) {
                throw new Error('from_wallet not found.');
            }
            if(fromWallet.balance < amount) {
                throw new Error('insufficient funds on the wallet balance.');
            }
            if(!toWallet) {
                throw new Error('to_wallet not found.');
            }

            await walletRepository.updateBalance(fromWallet.address, -amount);
            await walletRepository.updateBalance(toWallet.address, amount);

            await connection.commit();
        } catch(err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}