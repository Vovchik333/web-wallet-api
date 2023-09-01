import { NextFunction, Request, Response } from "express";
import { StatusHTTP } from "../StatusHTTP";
import * as authenticationService from "../services/authentication.service";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const result = await authenticationService.login(email, password);

        return res.status(StatusHTTP.OK).send(result);
    } catch(err) {
        next(err);
    }
}