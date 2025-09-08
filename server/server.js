import cors from "cors";
import express, { text } from "express";
import { db } from "./dbConnections.js";
const app = express();
app.use(express.json());
app.use(cors());
app.listen(8080, function () {});
