import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index";
import { initPool } from "./database";

const app: Express = express();
const port = process.env.PORT || 8080;

initPool();

app.use(compression())
app.use(express.json())
app.use(cors());
app.use('/api/', routes);

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});