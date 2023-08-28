import { NextFunction, Request, Response } from "express";
import { StatusHTTP } from "../StatusHTTP";
import User from "../../database/models/User";
import UserService from "../services/UserService";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            const user: User = await this.userService.getOne(id);

            return res.status(StatusHTTP.OK).send(user);
        } catch(err) {
            next(err);
        }
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = req.body;
            const id: string = await this.userService.create(user);

            return res.status(StatusHTTP.OK).send({ id });
        } catch(err) {
            next(err);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: User = req.body;
            await this.userService.updateOne(user);

            return res.sendStatus(StatusHTTP.OK);
        } catch(err) {
            next(err);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;
            await this.userService.deleteOne(id);

            return res.sendStatus(StatusHTTP.NO_CONTENT);
        } catch(err) {
            next(err);
        }
    }
}