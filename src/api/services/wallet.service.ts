import Wallet from "../../database/models/Wallet";
import * as walletRepository from "../../database/repositories/wallet.repository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export const getOne = async (id: string): Promise<Wallet> => {
    try {
        const wallet = await walletRepository.findById(id);

        if(!wallet) {
            throw new AppError(StatusHTTP.NOT_FOUND, 'wallet not found.');
        }

        return wallet;
    } catch(err) {
        throw err;
    }
}

export const create = async (wallet: Wallet): Promise<string> => {
    try {
        const id = await walletRepository.save(wallet);

        if(!id) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'wallet not created')
        }

        return id;
    } catch(err) {
        throw err;
    }
}

export const deleteOne = async (id: string): Promise<void> => {
    try {
        const result = await walletRepository.deleteOne(id);

        if(!result) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'wallet not deleted')
        }
    } catch(err) {
        throw err;
    }
}