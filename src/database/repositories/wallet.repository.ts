import Wallet from "../models/Wallet";
import { execute } from "../connector";
import { ResultSetHeader } from "mysql2";
import { walletQueries } from "../queries/wallet.queries";
import { randomUUID } from "crypto";

export const save = async (wallet: Wallet): Promise<string | undefined> => {
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

export const findById = async (id: string): Promise<Wallet | undefined> => {
    const foundWallet = await execute<Wallet[]>(
        walletQueries.findById, 
        [id]
    );

    return foundWallet[0];
}

export const findByAddress = async (address: string): Promise<Wallet | undefined> => {
    const foundWallet = await execute<Wallet[]>(
        walletQueries.findByAddress, 
        [address]
    );

    return foundWallet[0];
}

export const updateBalance = async (address: string, amount: number): Promise<boolean> => {
    const result = await execute<ResultSetHeader>(
        walletQueries.updateBalance, 
        [amount, new Date(), address]
    );

    return result.affectedRows > 0;
}

export const deleteOne = async (id: string): Promise<boolean> => {
    const result = await execute<ResultSetHeader>(
        walletQueries.deleteById, 
        [id]
    );

    return result.affectedRows > 0;
}
