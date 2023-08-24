"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseSource = void 0;
exports.databaseSource = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DATABASE: process.env.DATABASE,
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT) : 4
};
