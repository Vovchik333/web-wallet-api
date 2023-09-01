import { randomUUID } from "crypto";
import User from "../models/User";
import { execute } from "../connector";
import { userQueries } from "../queries/user.queries";
import { ResultSetHeader } from "mysql2";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const save = async (user: User): Promise<string | undefined> => {
    user.id = randomUUID();
    user.password = await bcrypt.hash(user.password, saltRounds);

    const result = await execute<ResultSetHeader>(
        userQueries.save, 
        [user.id, user.name, user.surname, user.email, user.password]
    );

    if(result.affectedRows < 1) {
        return undefined;
    }

    return user.id;
}

export const findByEmail = async (email: string): Promise<User | undefined> => {
    const foundUser = await execute<User[]>(
        userQueries.findByEmail, 
        [email]
    );

    return foundUser[0];
}

export const findById = async (id: string): Promise<User | undefined> => {
    const foundUser = await execute<User[]>(
        userQueries.findById, 
        [id]
    );

    return foundUser[0];
}

export const updateOne = async (user: User): Promise<boolean> => {
    const result = await execute<ResultSetHeader>(
        userQueries.update,
        [user.name, user.surname, user.email, user.password, new Date(), user.id]
    );

    return result.affectedRows > 0;
}

export const deleteOne = async (id: string): Promise<boolean> => {
    const result = await execute<ResultSetHeader>(
        userQueries.deleteById,
        [id]
    );

    return result.affectedRows > 0;
}