"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const index_1 = __importDefault(require("./routes/index"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
(0, database_1.initPool)();
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/', index_1.default);
app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});
