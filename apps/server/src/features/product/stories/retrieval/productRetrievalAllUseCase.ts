import type { InterfaceUseCase } from "@/common";
import type {
	InterfaceProductRepository,
	PaginatedResponse,
	PaginationRequest,
	ProductCardDTO,
} from "@marketplace/shared-packages";
import { mapProducts } from "../../support/product.helpers";

export class ProductRetrievalAllUseCase
	implements InterfaceProductRetrievalAllUseCase
{
	constructor(private dependencies: Dependencies) {}
	async execute(req: RequestModel): Promise<ResponseModel> {
		const { productRepository } = this.dependencies;
		const response = await productRepository.getPaginated(req);
		const mappedResponse = mapProducts(response.items);

		return {
			items: mappedResponse,
			limit: response.limit,
			nextCursor: response.nextCursor,
		};
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
};

type ResponseModel = PaginatedResponse<ProductCardDTO>;

type RequestModel = PaginationRequest;
export type InterfaceProductRetrievalAllUseCase = InterfaceUseCase<
	RequestModel,
	ResponseModel
>;
