import { RowDataPacket } from "mysql2";

export default interface Wallet extends RowDataPacket{
    id?: string;
    address: string;
    user_id: string;
    balance: number;
    currency: string;
    createdAt?: Date;
    updatedAt?: Date;
}