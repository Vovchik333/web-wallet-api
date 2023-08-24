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
const crypto_1 = require("crypto");
const __1 = require("..");
const user_queries_1 = require("../queries/user-queries");
class UserRepository {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.id = (0, crypto_1.randomUUID)();
            const result = yield (0, __1.execute)(user_queries_1.userQueries.save, [user.id, user.name, user.surname, user.email, user.password]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return user.id;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield (0, __1.execute)(user_queries_1.userQueries.findById, [id]);
            if (!foundUser) {
                return undefined;
            }
            return foundUser[0];
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, __1.execute)(user_queries_1.userQueries.update, [user.name, user.surname, user.email, user.password, new Date(), user.id]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return result.affectedRows;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, __1.execute)(user_queries_1.userQueries.deleteById, [id]);
            if (result.affectedRows < 1) {
                return undefined;
            }
            return result.affectedRows;
        });
    }
}
exports.default = UserRepository;
