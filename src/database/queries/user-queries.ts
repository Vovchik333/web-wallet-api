export const userQueries = {
    save: `
    INSERT INTO web_wallet_db.users (id, name, surname, email, password)
    VALUES (?, ?, ?, ?, ?);
    `,
    findById: `
    SELECT * FROM web_wallet_db.users WHERE id = ?;
    `,
    update: `
    UPDATE web_wallet_db.users
    SET name = ?, surname = ?, email = ?, password = ?, updatedAt = ?
    WHERE id = ?;
    `,
    deleteById: `
    DELETE FROM web_wallet_db.users
    WHERE id = ?;
    `
}