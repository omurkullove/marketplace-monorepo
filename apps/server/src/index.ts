import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { RouteCollector } from "./common/route/route-collector";
import { FirebaseDatabaseRepository } from "./common/repository/firebase-repository";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const db = new FirebaseDatabaseRepository();

const routerCollector = new RouteCollector(db);

app.use("/api", routerCollector.getRouter());

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
