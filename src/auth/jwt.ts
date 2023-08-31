import jwt, { SignOptions } from "jsonwebtoken";
import fs from "fs";
import { jwtKeys } from "../config";

export const signJwt = (payload: Object, options: SignOptions = {}) => {
    const privateKey = fs.readFileSync('keys/private.pem', 'utf-8');
    return jwt.sign(payload, privateKey, {
        ...options,
        algorithm: 'RS256'
    });
}

export const verifyJwt = (token: string) => {
    try {
        const publicKey = fs.readFileSync('keys/private.pem', 'utf-8');
        return jwt.verify(token, publicKey);
    } catch(err) {
        throw err;
    }
}