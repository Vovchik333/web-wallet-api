import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { StatusHTTP } from "../api/StatusHTTP";
import { verifyJwt } from "./jwt";
import { JwtPayload } from "jsonwebtoken";

export interface JwtRequest extends Request {
    token: string | JwtPayload;
}

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if(!token) {
            throw new AppError(StatusHTTP.FORBIDDEN, 'forbidden');
        }

        const decoded = verifyJwt(token);
        (req as JwtRequest).token = decoded;

        next();
    } catch(err) {
        throw err;
    }
}