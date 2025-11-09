import type { InterfaceUseCase } from "@/common";
import type {
	InterfaceProductRepository,
	ProductDocument,
} from "@marketplace/shared-packages";

export class ProductRetrievalAllUseCase
	implements InterfaceProductRetrievalAllUseCase
{
	constructor(private dependencies: Dependencies) {}
	async execute(): Promise<ResponseModel> {
		const { productRepository } = this.dependencies;
		const response = await productRepository.getAll();

		return response;
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
};

type ResponseModel = Array<ProductDocument>;
export type InterfaceProductRetrievalAllUseCase = InterfaceUseCase<
	void,
	ResponseModel
>;
