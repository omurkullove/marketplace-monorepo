import { Router } from "express";
import { ProductRepository } from "../repository/product-repository";
import { ProductRouter } from "@/features/product/support/product.route";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { CurrencyService } from "../service/convert-currency-service";

export class RouteCollector {
	private router = Router();

	constructor(private db: InterfaceDatabaseRepository) {
		this.registerRoutes();
	}

	private registerRoutes() {
		const currencyService = new CurrencyService();
		const productRepository = new ProductRepository({ db: this.db });
		const productRouter = new ProductRouter(productRepository, currencyService);

		this.router.use(productRouter.getRouter());
	}

	public getRouter(): Router {
		return this.router;
	}
}
