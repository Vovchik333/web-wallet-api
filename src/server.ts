import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import routes from "./api/index";
import { initPool } from "./database/connector";
import { errorResponder } from "./errors/error-handlers";

const app: Express = express();
const port = process.env.PORT || 8080;

initPool();

app.use(express.json());
app.use(cors());
app.use('/api/', routes);
app.use(errorResponder);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});