export const walletQueries = {
    save: `
    INSERT INTO web_wallet_db.wallets (id, address, user_id, balance, currency)
    VALUES (?, ?, ?, ?, ?);
    `,
    findById: `
    SELECT * FROM web_wallet_db.wallets WHERE id = ?;
    `,
    findByAddress: `
    SELECT * FROM web_wallet_db.wallets WHERE address = ?;
    `,
    updateBalance: `
    UPDATE web_wallet_db.wallets
    SET balance = balance + ?, updatedAt = ?
    WHERE address = ?;
    `,
    deleteById: `
    DELETE FROM web_wallet_db.wallets
    WHERE id = ?;
    `
}