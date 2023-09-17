import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import { logger } from "../logging/logger";

export const errorResponder = (
    err: AppError, 
    req: Request, 
    res: Response,
    next: NextFunction) => {
    logger.error(err.message);
    const status = err.statusCode || 404;
    const message = err.message;
    res.status(status).send({ message });
}