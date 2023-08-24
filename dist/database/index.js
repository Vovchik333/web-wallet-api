"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = exports.initPool = exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("../config");
const initPool = () => {
    try {
        exports.pool = (0, promise_1.createPool)({
            connectionLimit: config_1.databaseSource.DB_CONNECTION_LIMIT,
            host: config_1.databaseSource.DB_HOST,
            user: config_1.databaseSource.DB_USER,
            password: config_1.databaseSource.DB_PASSWORD,
            database: config_1.databaseSource.DATABASE
        });
        console.log('MySql Adapter Pool generated successfully');
    }
    catch (err) {
        throw new Error('failed to initialized pool');
    }
};
exports.initPool = initPool;
const execute = (query, params = []) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!exports.pool) {
            throw new Error('pool was not created.');
        }
        const [result, fields] = yield exports.pool.query(query, params);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.execute = execute;
