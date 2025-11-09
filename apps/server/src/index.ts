import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HttpStatus } from "@marketplace/shared-packages";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (_, res) => {
	res.send(`Hello ${HttpStatus.CREATED} 1234 `);
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
