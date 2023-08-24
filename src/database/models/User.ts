import { RowDataPacket } from "mysql2";

export default interface User extends RowDataPacket{
    id?: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}