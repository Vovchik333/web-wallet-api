CREATE USER 'web_wallet_api'@'localhost' IDENTIFIED BY 'wallet321';

GRANT ALL PRIVILEGES ON web_wallet_db.* TO 'web_wallet_api'@'localhost';

FLUSH PRIVILEGES;