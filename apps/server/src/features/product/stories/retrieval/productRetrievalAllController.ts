import type { InterfaceController } from "@/common";
import type { InterfaceProductRetrievalAllUseCase } from "./productRetrievalAllUseCase";
import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "@marketplace/shared-packages";

export class ProductRetrievalAllController implements InterfaceController {
	constructor(private dependencies: Dependencies) {}
	async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { productRetrievalAllUseCase } = this.dependencies;
		const response = await productRetrievalAllUseCase.execute();
		res.status(HttpStatus.OK).json(response);
	}
}

type Dependencies = {
	productRetrievalAllUseCase: InterfaceProductRetrievalAllUseCase;
};
