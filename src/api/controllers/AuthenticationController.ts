import { NextFunction, Request, Response } from "express";
import { StatusHTTP } from "../StatusHTTP";
import UserService from "../services/UserService";
import { login } from "../services/AuthenticationService";

const userService = new UserService();

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);

        return res.status(StatusHTTP.OK).send(result);
    } catch(err) {
        next(err);
    }
}