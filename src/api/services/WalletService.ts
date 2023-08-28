import IWalletRepository from "../../database/interfaces/IWalletRepository";
import Wallet from "../../database/models/Wallet";
import WalletRepository from "../../database/repositories/WalletRepository";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";

export default class WalletService {
    private walletRepository: IWalletRepository;

    constructor() {
        this.walletRepository = new WalletRepository();
    }

    getOne = async (id: string): Promise<Wallet> => {
        try {
            const wallet = await this.walletRepository.findById(id);

            if(!wallet) {
                throw new AppError(StatusHTTP.NOT_FOUND, 'wallet not found.');
            }

            return wallet;
        } catch(err) {
            throw err;
        }
    }

    create = async (wallet: Wallet): Promise<string> => {
        try {
            const id = await this.walletRepository.save(wallet);

            if(!id) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'wallet not created')
            }

            return id;
        } catch(err) {
            throw err;
        }
    }

    deleteOne = async (id: string): Promise<void> => {
        try {
            const result = await this.walletRepository.delete(id);

            if(!result) {
                throw new AppError(StatusHTTP.BAD_REQUEST, 'wallet not deleted')
            }
        } catch(err) {
            throw err;
        }
    }
}