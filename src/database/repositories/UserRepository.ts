import { randomUUID } from "crypto";
import User from "../models/User";
import { execute, pool } from "..";
import { userQueries } from "../queries/user-queries";
import { ResultSetHeader } from "mysql2";
import IUserRepository from "../interfaces/IUserRepository";

export default class UserRepository implements IUserRepository {
    async save(user: User): Promise<string | undefined> {
        user.id = randomUUID();

        const result = await execute<ResultSetHeader>(
            userQueries.save, 
            [user.id, user.name, user.surname, user.email, user.password]
        );

        if(result.affectedRows < 1) {
            return undefined;
        }

        return user.id;
    }

    async findById(id: string): Promise<User | undefined> {
        const foundUser = await execute<User[]>(
            userQueries.findById, 
            [id]
        );

        return foundUser[0];
    }

    async update(user: User): Promise<boolean> {
        const result = await execute<ResultSetHeader>(
            userQueries.update,
            [user.name, user.surname, user.email, user.password, new Date(), user.id]
        );

        return result.affectedRows > 0;
    }

    async delete(id: string): Promise<boolean> {
        const result = await execute<ResultSetHeader>(
            userQueries.deleteById,
            [id]
        );

        return result.affectedRows > 0;
    }
}