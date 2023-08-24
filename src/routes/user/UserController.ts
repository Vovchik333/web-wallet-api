import { Request, Response } from "express";
import UserRepository from "../../database/repositories/UserRepository";
import { StatusHTTP } from "../Status.HTTP";
import User from "../../database/models/User";
import IUserRepository from "../../database/interfaces/IUserRepository";
import Wallet from "../../database/models/Wallet";
import WalletRepository from "../../database/repositories/WalletRepository";

export default class UserController {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.updateOne = this.updateOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
    }

    public async getOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const user = await this.userRepository.findById(id);

        if(!user) {
            res.status(StatusHTTP.NOT_FOUND).send(null);
        }

        res.status(StatusHTTP.OK).send(user);
    }

    public async create(req: Request, res: Response) {
        const user: User = req.body;
        const userId = await this.userRepository.save(user);

        if(!userId) {
            res.status(StatusHTTP.BAD_REQUEST).send(null);
            return;
        }

        const walletRepository = new WalletRepository();
        const wallet = {
            user_id: userId,
            balance: 0,
            currency: 'USD'
        } as Wallet;

        await walletRepository.save(wallet);

        res.status(StatusHTTP.OK).send({ userId });
    }

    public async updateOne(req: Request, res: Response) {
        const user: User = req.body;
        const result = await this.userRepository.update(user);

        if(!result) {
            res.status(StatusHTTP.BAD_REQUEST).send(null);
            return;
        }

        res.status(StatusHTTP.OK).send({ result });
    }

    public async deleteOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const result = await this.userRepository.delete(id);

        if(!result) {
            res.status(StatusHTTP.NOT_FOUND).send(null);
        }

        res.status(StatusHTTP.NO_CONTENT).send({ result });
    }
}