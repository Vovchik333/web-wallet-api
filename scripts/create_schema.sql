USE web_wallet_db;

CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(254) NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS wallets(
    id VARCHAR(36) NOT NULL,
    address VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    balance DECIMAL(20, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS transfers(
    id VARCHAR(36) NOT NULL,
    from_wallet VARCHAR(36) NOT NULL,
    to_wallet VARCHAR(36) NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    status VARCHAR(36) NOT NULL,
    createdAt DATETIME DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS card_operations(
    id VARCHAR(36) NOT NULL,
    wallet_id VARCHAR(36) NOT NULL,
    card_number VARCHAR(29) NOT NULL,
    type VARCHAR(8) NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL, 
    status VARCHAR(36) NOT NULL,
    createdAt DATETIME DEFAULT NOW()
);