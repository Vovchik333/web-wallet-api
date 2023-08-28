import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";

export const errorResponder = (
    err: AppError, 
    req: Request, 
    res: Response,
    next: NextFunction) => {
    const status = err.statusCode || 404;
    const message = err.message;
    res.status(status).send({ message });
}