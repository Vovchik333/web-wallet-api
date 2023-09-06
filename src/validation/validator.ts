import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const validate = (schema: AnyZodObject) => 
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);

            next();
        } catch(err) {
            if(err instanceof ZodError) {
                const { message } = err.errors[0];
                err = new Error(message);
            }
            next(err);
        }
    }