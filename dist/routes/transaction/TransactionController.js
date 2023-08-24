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
const CardOperation_1 = require("../../database/models/CardOperation");
const CardOperationRepository_1 = __importDefault(require("../../database/repositories/CardOperationRepository"));
const TransferRepository_1 = __importDefault(require("../../database/repositories/TransferRepository"));
const Status_HTTP_1 = require("../Status.HTTP");
const TransactionStatus_1 = require("../../database/TransactionStatus");
class TransactionController {
    constructor() {
        this.cardOperationRepository = new CardOperationRepository_1.default();
        this.transferRepository = new TransferRepository_1.default();
        this.deposit = this.deposit.bind(this);
        this.transfer = this.transfer.bind(this);
        this.withdraw = this.withdraw.bind(this);
    }
    deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deposit = req.body;
            const { wallet_id, card_number, amount } = deposit;
            deposit.type = CardOperation_1.OperationType.DEPOSIT;
            try {
                yield this.cardOperationRepository.createDeposit(wallet_id, card_number, amount);
                deposit.status = TransactionStatus_1.TransactionStatus.COMPLETED;
                res.status(Status_HTTP_1.StatusHTTP.OK);
            }
            catch (err) {
                deposit.status = TransactionStatus_1.TransactionStatus.FAILED;
                res.status(Status_HTTP_1.StatusHTTP.BAD_REQUEST);
                console.log(err);
            }
            const cardOperation = yield this.cardOperationRepository.save(deposit);
            res.send({ cardOperation });
        });
    }
    transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const transfer = req.body;
            const { from, to, amount } = transfer;
            try {
                yield this.transferRepository.createTransfer(from, to, amount);
                transfer.status = TransactionStatus_1.TransactionStatus.COMPLETED;
                res.status(Status_HTTP_1.StatusHTTP.OK);
            }
            catch (err) {
                transfer.status = TransactionStatus_1.TransactionStatus.FAILED;
                res.status(Status_HTTP_1.StatusHTTP.BAD_REQUEST);
                console.log(err);
            }
            yield this.transferRepository.save(transfer);
            res.send({ transfer });
        });
    }
    withdraw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const withdraw = req.body;
            const { wallet_id, card_number, amount } = withdraw;
            withdraw.type = CardOperation_1.OperationType.WITHDRAW;
            try {
                yield this.cardOperationRepository.createWithdraw(wallet_id, card_number, amount);
                withdraw.status = TransactionStatus_1.TransactionStatus.COMPLETED;
                res.status(Status_HTTP_1.StatusHTTP.OK);
            }
            catch (err) {
                withdraw.status = TransactionStatus_1.TransactionStatus.FAILED;
                res.status(Status_HTTP_1.StatusHTTP.BAD_REQUEST);
                console.log(err);
            }
            const cardOperation = yield this.cardOperationRepository.save(withdraw);
            res.send({ cardOperation });
        });
    }
}
exports.default = TransactionController;
