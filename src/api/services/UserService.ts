import Wallet from "../../database/models/Wallet";
import WalletRepository from "../../database/repositories/WalletRepository";
import User from "../../database/models/User";
import IUserRepository from "../../database/interfaces/IUserRepository";
import UserRepository from "../../database/repositories/UserRepository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export default class UserService {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    getOne = async (id: string): Promise<User>  => {
        try {
            const user = await this.userRepository.findById(id);

            if(!user) {
                throw new AppError(StatusHTTP.NOT_FOUND, 'user not found.');
            }

            return user;
        } catch(err) {
            throw err;
        }
    }

    create = async (user: User): Promise<string> => {
        try {
            const userId = await this.userRepository.save(user);

            if(!userId) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'user not created.');
            }
    
            const walletRepository = new WalletRepository();
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

    updateOne = async (user: User): Promise<void> => {
        try {
            const result = await this.userRepository.update(user);

            if(!result) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'user not updated.');
            }
        } catch(err) {
            throw err;
        }
    }

    deleteOne = async (id: string): Promise<void> => {
        try {
            const result = await this.userRepository.delete(id);

            if(!result) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'user not deleted.');
            }
        } catch(err) {
            throw err;
        }
    }
}