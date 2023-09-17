import { Pool, ResultSetHeader, RowDataPacket, createPool } from "mysql2/promise";
import { databaseSource } from "../config";
import { logger } from "../logging/logger";

export let pool: Pool;

export const initPool = () => {
    try {
        pool = createPool(
            {
                connectionLimit: databaseSource.DB_CONNECTION_LIMIT,
                host: databaseSource.DB_HOST,
                user: databaseSource.DB_USER,
                password: databaseSource.DB_PASSWORD,
                database: databaseSource.DATABASE
            }
        );

        logger.info('MySql Adapter Pool generated successfully');
    } catch (err) {
        logger.error('failed to initialized pool');
        throw new Error('failed to initialized pool');
    }
}

export const execute = async <T extends RowDataPacket[] | ResultSetHeader>(query: string, params: string[] | Object = []): Promise<T> => {
    try {
        if (!pool) {
            throw new Error('pool was not created.');
        }

        const [result, fields] = await pool.query<T>(query, params);
        return result;
    } catch(err) {
        throw err;
    }
}