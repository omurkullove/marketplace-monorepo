import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".server.env" });

import { FirebaseDatabaseRepository } from "./common/repository/firebase-repository";
import { RouteCollector } from "./common/route/route-collector";

import { errorHandler } from "./common";

import "@/common/errors/init-error-modules";

const app = express();

app.use(cors());
app.use(express.json());

const db = new FirebaseDatabaseRepository();

const routerCollector = new RouteCollector(db);

app.use("/api", routerCollector.getRouter());
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});
