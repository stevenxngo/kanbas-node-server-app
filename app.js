import express from "express";
import cors from "cors";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";

const app = express();
app.use(cors());
app.use(express.json());
Hello(app);
Lab5(app);
app.listen(4000);
