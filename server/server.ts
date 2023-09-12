import express, { Application } from "express";
import bodyParser from "body-parser";
import {API} from "./src/routes/api";
import cors from "cors";

const PORT = 4000;
const api = new API().getRouter();
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/api', api)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });