import { Request, Response } from "express";
import Wallet from "../../database/models/Wallet";
import WalletRepository from "../../database/repositories/WalletRepository";
import { StatusHTTP } from "../Status.HTTP";
import IWalletRepository from "../../database/interfaces/IWalletRepository";

export default class WalletController {
    private walletRepository: IWalletRepository;

    constructor() {
        this.walletRepository = new WalletRepository();
        this.getOne = this.getOne.bind(this);
        this.create = this.create.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
    }

    public async getOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const wallet = await this.walletRepository.findById(id);

        if(!wallet) {
            res.status(StatusHTTP.NOT_FOUND).send(null);
            return;
        }

        res.status(StatusHTTP.OK).send(wallet);
    }

    public async create(req: Request, res: Response) {
        const wallet: Wallet = req.body;
        const result = await this.walletRepository.save(wallet);

        if(!result) {
            res.status(StatusHTTP.BAD_REQUEST).send(null);
            return;
        }

        res.status(StatusHTTP.OK).send({result});
    }

    public async deleteOne(req: Request, res: Response) {
        const id: string = req.params.id;
        const result = await this.walletRepository.delete(id);

        if(!result) {
            res.status(StatusHTTP.NOT_FOUND).send(null);
            return;
        }

        res.status(StatusHTTP.NO_CONTENT).send({result});
    }
}