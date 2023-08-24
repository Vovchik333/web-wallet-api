import Wallet from "../models/Wallet";

export default interface IWalletRepository {
    save(wallet: Wallet): Promise<string | undefined>;
    findById(id: string): Promise<Wallet | undefined>;
    findByAddress(address: string): Promise<Wallet | undefined>;
    updateBalance(address: string, amount: number): Promise<number | undefined>;
    delete(id: string): Promise<number | undefined>;
}