export const transferQueries = {
    save: `
    INSERT INTO web_wallet_db.transfers (id, from_wallet, to_wallet, amount, status)
    VALUES (?, ?, ?, ?, ?);
    `,
    findById: `
    SELECT * FROM web_wallet_db.transfers WHERE id = ?;
    `
}