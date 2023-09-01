import Wallet from "../../database/models/Wallet";
import * as walletRepository from "../../database/repositories/wallet.repository";
import User from "../../database/models/User";
import * as userRepository from "../../database/repositories/user.repository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export const getOne = async (id: string): Promise<User>  => {
    try {
        const user = await userRepository.findById(id);

        if(!user) {
            throw new AppError(StatusHTTP.NOT_FOUND, 'user not found.');
        }

        return user;
    } catch(err) {
        throw err;
    }
}

export const create = async (user: User): Promise<string> => {
    try {
        const userId = await userRepository.save(user);

        if(!userId) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'user not created.');
        }

        const wallet = {
            user_id: userId,
            balance: 0,
            currency: 'USD'
        } as Wallet;

        await walletRepository.save(wallet);

        return userId;
    } catch(err) {
        throw err;
    }
}

export const updateOne = async (user: User): Promise<void> => {
    try {
        const result = await userRepository.updateOne(user);

        if(!result) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'user not updated.');
        }
    } catch(err) {
        throw err;
    }
}

export const deleteOne = async (id: string): Promise<void> => {
    try {
        const result = await userRepository.deleteOne(id);

        if(!result) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'user not deleted.');
        }
    } catch(err) {
        throw err;
    }
}