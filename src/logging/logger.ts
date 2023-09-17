import path from "path";
import { logDirectory } from "../config";
import fs from 'fs';
import { createLogger, format, transports } from "winston";

let dir = logDirectory;
if(!dir) {
    dir = path.resolve('logs');
}

if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const customFormat = format.printf(({ level, message, timestamp }) => 
    `[${timestamp}] [${level.toUpperCase()}]: ${message}`
);

export const logger = createLogger({
    level: 'debug',
    format: format.combine(format.timestamp(), customFormat),
    transports: [
        new transports.File({
            filename: 'logs/example.log'
        }),
        new transports.File({
            level: 'error',
            filename: 'logs/errors.log'
        }),
        new transports.Console()
    ],
    exitOnError: false
});