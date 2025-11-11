import type { InterfaceUseCaseProductRetrievalAll } from "./UseCaseProductRetrievalAll";
import type { NextFunction, Request, Response } from "express";

import {
	type InterfaceController,
	complexValidation,
	isCurrency,
} from "@/common";
import { HttpStatus } from "@marketplace/shared-packages";

export class ControllerProductRetrievalAll implements InterfaceController {
	constructor(private dependencies: Dependencies) {}
	async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { productRetrievalAllUseCase } = this.dependencies;

		try {
			const validated = complexValidation(req.query, [
				{ key: "currency", shouldBe: isCurrency, isRequired: "required" },
				{
					key: "size",
					shouldBe: "number",
					isRequired: "required",
					greaterThan: 0,
					lessThan: 100,
				},
				{ key: "page", shouldBe: "number", isRequired: "required" },
			]);

			const response = await productRetrievalAllUseCase.execute({
				size: validated.size,
				page: validated.page,
				currency: validated.currency,
			});
			res.status(HttpStatus.OK).json(response);
		} catch (error) {
			next(error);
		}
	}
}

type Dependencies = {
	productRetrievalAllUseCase: InterfaceUseCaseProductRetrievalAll;
};
