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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const isolation_level_queries_1 = require("../queries/isolation-level-queries");
const WalletRepository_1 = __importDefault(require("./WalletRepository"));
const transfer_queries_1 = require("../queries/transfer-queries");
const crypto_1 = require("crypto");
class TransferRepository {
    save(transfer) {
        return __awaiter(this, void 0, void 0, function* () {
            transfer.id = (0, crypto_1.randomUUID)();
            const result = yield (0, __1.execute)(transfer_queries_1.transferQueries.save, [transfer.id, transfer.from, transfer.to, transfer.amount, transfer.status]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return transfer.id;
        });
    }
    createTransfer(from, to, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const walletRepository = new WalletRepository_1.default();
            const connection = yield __1.pool.getConnection();
            try {
                yield (0, __1.execute)(isolation_level_queries_1.isolationLevelQueries.readCommitted);
                yield connection.beginTransaction();
                const fromWallet = yield walletRepository.findByAddress(from);
                const toWallet = yield walletRepository.findByAddress(to);
                if (!fromWallet) {
                    throw new Error('from_wallet not found.');
                }
                if (fromWallet.balance < amount) {
                    throw new Error('insufficient funds on the wallet balance.');
                }
                if (!toWallet) {
                    throw new Error('to_wallet not found.');
                }
                yield walletRepository.updateBalance(fromWallet.address, -amount);
                yield walletRepository.updateBalance(toWallet.address, amount);
                yield connection.commit();
            }
            catch (err) {
                yield connection.rollback();
                throw err;
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.default = TransferRepository;
