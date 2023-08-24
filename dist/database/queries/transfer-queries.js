"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferQueries = void 0;
exports.transferQueries = {
    save: `
    INSERT INTO web_wallet_db.transfers (id, from_wallet, to_wallet, amount, status)
    VALUES (?, ?, ?, ?, ?);
    `,
    findById: `
    SELECT * FROM web_wallet_db.transfers WHERE id = ?;
    `
};
