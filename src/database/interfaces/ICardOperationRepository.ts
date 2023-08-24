import CardOperation from "../models/CardOperation";

export default interface ICardOperationRepository {
    save(cardOperation: CardOperation): Promise<string | undefined>;
    createDeposit(wallet_id: string, card_number: string, amount: number): Promise<void>;
    createWithdraw(wallet_id: string, card_number: string, amount: number): Promise<void>;
}