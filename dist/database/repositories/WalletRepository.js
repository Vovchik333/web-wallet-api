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
const __1 = require("..");
const wallet_queries_1 = require("../queries/wallet-queries");
const crypto_1 = require("crypto");
class WalletRepository {
    save(wallet) {
        return __awaiter(this, void 0, void 0, function* () {
            wallet.id = (0, crypto_1.randomUUID)();
            wallet.address = (0, crypto_1.randomUUID)();
            const result = yield (0, __1.execute)(wallet_queries_1.walletQueries.save, [wallet.id, wallet.address, wallet.user_id, wallet.balance, wallet.currency]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return wallet.id;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundWallet = yield (0, __1.execute)(wallet_queries_1.walletQueries.findById, [id]);
            if (!foundWallet) {
                return undefined;
            }
            return foundWallet[0];
        });
    }
    findByAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundWallet = yield (0, __1.execute)(wallet_queries_1.walletQueries.findByAddress, [address]);
            if (!foundWallet) {
                return undefined;
            }
            return foundWallet[0];
        });
    }
    updateBalance(address, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, __1.execute)(wallet_queries_1.walletQueries.updateBalance, [amount, new Date(), address]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return result.affectedRows;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, __1.execute)(wallet_queries_1.walletQueries.deleteById, [id]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return result.affectedRows;
        });
    }
}
exports.default = WalletRepository;
