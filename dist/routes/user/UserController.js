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
const UserRepository_1 = __importDefault(require("../../database/repositories/UserRepository"));
const Status_HTTP_1 = require("../Status.HTTP");
const WalletRepository_1 = __importDefault(require("../../database/repositories/WalletRepository"));
class UserController {
    constructor() {
        this.userRepository = new UserRepository_1.default();
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const user = yield this.userRepository.findById(id);
            if (!user) {
                res.status(Status_HTTP_1.StatusHTTP.NOT_FOUND).send(null);
            }
            res.status(Status_HTTP_1.StatusHTTP.OK).send(user);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const userId = yield this.userRepository.save(user);
            if (!userId) {
                res.status(Status_HTTP_1.StatusHTTP.BAD_REQUEST).send(null);
                return;
            }
            const walletRepository = new WalletRepository_1.default();
            const wallet = {
                user_id: userId,
                balance: 0,
                currency: 'USD'
            };
            yield walletRepository.save(wallet);
            res.status(Status_HTTP_1.StatusHTTP.OK).send({ userId });
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            const result = yield this.userRepository.update(user);
            if (!result) {
                res.status(Status_HTTP_1.StatusHTTP.BAD_REQUEST).send(null);
                return;
            }
            res.status(Status_HTTP_1.StatusHTTP.OK).send({ result });
        });
    }
    deleteOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const result = yield this.userRepository.delete(id);
            if (!result) {
                res.status(Status_HTTP_1.StatusHTTP.NOT_FOUND).send(null);
            }
            res.status(Status_HTTP_1.StatusHTTP.NO_CONTENT).send({ result });
        });
    }
}
exports.default = UserController;
