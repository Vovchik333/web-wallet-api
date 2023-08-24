import Wallet from "../models/Wallet";
import { execute } from "..";
import { ResultSetHeader } from "mysql2";
import { walletQueries } from "../queries/wallet-queries";
import { randomUUID } from "crypto";
import IWalletRepository from "../interfaces/IWalletRepository";

export default class WalletRepository implements IWalletRepository {
    async save(wallet: Wallet): Promise<string | undefined> {
        wallet.id = randomUUID();
        wallet.address = randomUUID();

        const result = await execute<ResultSetHeader>(
            walletQueries.save, 
            [wallet.id, wallet.address, wallet.user_id, wallet.balance, wallet.currency]
        );

        if(result.affectedRows < 1) {
            return undefined;
        }

        return wallet.id;
    }

    async findById(id: string): Promise<Wallet | undefined> {
        const foundWallet = await execute<Wallet[]>(
            walletQueries.findById, 
            [id]
        );

        if(!foundWallet) {
            return undefined;
        }

        return foundWallet[0];
    }

    async findByAddress(address: string): Promise<Wallet | undefined> {
        const foundWallet = await execute<Wallet[]>(
            walletQueries.findByAddress, 
            [address]
        );

        if(!foundWallet) {
            return undefined;
        }

        return foundWallet[0];
    }

    async updateBalance(address: string, amount: number): Promise<number | undefined> {
        const result = await execute<ResultSetHeader>(
            walletQueries.updateBalance, 
            [amount, new Date(), address]
        );

        if(result.affectedRows < 1) {
            return undefined;
        }

        return result.affectedRows;
    }

    async delete(id: string): Promise<number | undefined> {
        const result = await execute<ResultSetHeader>(
            walletQueries.deleteById, 
            [id]
        );

        if(result.affectedRows < 1) {
            return undefined;
        }

        return result.affectedRows;
    }
}