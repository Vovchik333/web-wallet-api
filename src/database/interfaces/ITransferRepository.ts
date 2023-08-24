import Transfer from "../models/Transfer";

export default interface ITransferRepository {
    save(transfer: Transfer): Promise<string | undefined>;
    createTransfer(from: string, to: string, amount: number): Promise<void>;
}