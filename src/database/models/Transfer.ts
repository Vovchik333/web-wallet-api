import { RowDataPacket } from "mysql2";
import { TransactionStatus } from "../TransactionStatus";

export default interface Transfer extends RowDataPacket{
    id?: string;
    from: string;
    to: string;
    amount: number;
    status?: TransactionStatus;
    createdAt?: Date;
}