import type { InterfaceController } from "@/common";
import type { Request, Response, NextFunction } from "express";
import type { InterfaceUseCaseProductRetrievalOne } from "./UseCaseProductRetrievalOne";
import { complexValidation, isCurrency } from "@/common";
import { HttpStatus } from "@marketplace/shared-packages";

export class ControllerProductRetrievalOne implements InterfaceController {
	constructor(private dependencies: Dependencies) {}
	async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { productRetrievalOneUseCase } = this.dependencies;

		try {
			const validated = complexValidation({ ...req.params, ...req.query }, [
				{ key: "id", isRequired: "required", shouldBe: "string" },
				{
					isRequired: "required",
					shouldBe: isCurrency,
					key: "currency",
				},
			]);

			const response = await productRetrievalOneUseCase.execute({
				id: validated.id,
				currency: validated.currency,
			});

			res.status(HttpStatus.OK).json(response);
		} catch (error) {
			next(error);
		}
	}
}

type Dependencies = {
	productRetrievalOneUseCase: InterfaceUseCaseProductRetrievalOne;
};
