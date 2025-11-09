import { Router } from "express";
import { ProductWiringFactory } from "./product.wiring";
import {
	ROUTE,
	type InterfaceProductRepository,
} from "@marketplace/shared-packages";

export class ProductRouter {
	private router = Router();
	private wiringFactory: ProductWiringFactory;

	constructor(productRepository: InterfaceProductRepository) {
		this.wiringFactory = new ProductWiringFactory({ productRepository });
		this.registerRoutes();
	}

	private registerRoutes() {
		const { controller } = this.wiringFactory.expose();

		this.router.get(
			ROUTE.PRODUCTS,
			async (req, res, next) =>
				await controller.productRetrievalAll.handle(req, res, next),
		);
	}

	public getRouter(): Router {
		return this.router;
	}
}
