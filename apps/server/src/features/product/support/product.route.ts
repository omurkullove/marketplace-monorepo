import { Router } from "express";
import { ProductWiringFactory } from "./product.wiring";
import {
	ROUTE,
	type InterfaceProductRepository,
} from "@marketplace/shared-packages";
import type { CurrencyService } from "@/common/service/convert-currency-service";

export class ProductRouter {
	private router = Router();
	private wiringFactory: ProductWiringFactory;

	constructor(
		productRepository: InterfaceProductRepository,
		currencyService: CurrencyService,
	) {
		this.wiringFactory = new ProductWiringFactory({
			productRepository,
			currencyService,
		});
		this.registerRoutes();
	}

	private registerRoutes() {
		const { controller } = this.wiringFactory.expose();

		this.router.get(
			ROUTE.PRODUCTS,
			async (req, res, next) =>
				await controller.productRetrievalAll.handle(req, res, next),
		);

		this.router.get(
			ROUTE.PRODUCT_DETAILS,
			async (req, res, next) =>
				await controller.productRetrievalOne.handle(req, res, next),
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}
