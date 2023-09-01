import { NextFunction, Request, Response } from "express";
import { StatusHTTP } from "../StatusHTTP";
import User from "../../database/models/User";
import * as userService from "../services/user.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = req.body;
        const id: string = await userService.create(user);

        return res.status(StatusHTTP.OK).send({ id });
    } catch(err) {
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const user: User = await userService.getOne(id);

        return res.status(StatusHTTP.OK).send(user);
    } catch(err) {
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = req.body;
        await userService.updateOne(user);

        return res.sendStatus(StatusHTTP.OK);
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        await userService.deleteOne(id);

        return res.sendStatus(StatusHTTP.NO_CONTENT);
    } catch(err) {
        next(err);
    }
}