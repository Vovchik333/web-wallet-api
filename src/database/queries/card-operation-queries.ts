export const cardOperationQueries = {
    save: `
    INSERT INTO web_wallet_db.card_operations (id, wallet_id, card_number, type, amount, currency, status)
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `,
    findById: `
    SELECT * FROM web_wallet_db.card_operations WHERE id = ?;
    `
}