import { validatePaginatedRequest, type InterfaceController } from "@/common";
import type { InterfaceProductRetrievalAllUseCase } from "./productRetrievalAllUseCase";
import type { NextFunction, Request, Response } from "express";
import { HttpStatus } from "@marketplace/shared-packages";

export class ProductRetrievalAllController implements InterfaceController {
	constructor(private dependencies: Dependencies) {}
	async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { productRetrievalAllUseCase } = this.dependencies;

		try {
			validatePaginatedRequest(req.query);
			const response = await productRetrievalAllUseCase.execute({
				limit: Number(req.query.limit),
				cursor: req.query.cursor,
			});
			res.status(HttpStatus.OK).json(response);
		} catch (error) {
			next(error);
		}
	}
}

type Dependencies = {
	productRetrievalAllUseCase: InterfaceProductRetrievalAllUseCase;
};
