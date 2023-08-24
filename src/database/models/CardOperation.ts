import { RowDataPacket } from "mysql2";
import { TransactionStatus } from "../TransactionStatus";

export enum OperationType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAW = 'WITHDRAW'
}

export default interface CardOperation extends RowDataPacket{
    id?: string;
    wallet_id: string;
    card_number: string;
    type?: OperationType;
    amount: number;
    currency: string; 
    status?: TransactionStatus;
    createdAt?: Date;
}