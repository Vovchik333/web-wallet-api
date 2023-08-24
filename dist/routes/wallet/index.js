"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletController_1 = __importDefault(require("./WalletController"));
const router = (0, express_1.Router)();
const walletController = new WalletController_1.default();
router.route('/:id')
    .get(walletController.getOne)
    .delete(walletController.deleteOne);
router.route('/')
    .post(walletController.create);
exports.default = router;
