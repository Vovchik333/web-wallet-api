import { signJwt } from "../../auth/jwt";
import AppError from "../../errors/AppError";
import { StatusHTTP } from "../StatusHTTP";
import bcrypt from "bcrypt";
import * as userRepository from "../../database/repositories/user.repository"

type LoginResult = {
    user: { 
        id: string 
        email: string
    }, 
    token: string
}

export const login = async (email: string, password: string): Promise<LoginResult>  => {
    try {
        const foundUser = await userRepository.findByEmail(email);
        if(!foundUser) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'email is not correct.');
        }

        const isMatch = bcrypt.compareSync(password, foundUser.password);
        if(!isMatch) {
            throw new AppError(StatusHTTP.BAD_REQUEST, 'password is not correct.');
        }

        const token = signJwt(
            {
                id: foundUser.id,
                email: foundUser.email
            },
            { expiresIn: '1 day' }
        );

        return { 
            user: { 
                id: foundUser.id as string, 
                email: foundUser.email 
            }, 
            token: token
        };
    } catch(err) {
        throw err;
    }
}