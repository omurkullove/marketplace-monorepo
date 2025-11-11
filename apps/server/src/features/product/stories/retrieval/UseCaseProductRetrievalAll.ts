import type { InterfaceUseCase } from "@/common";
import type {
	CommonRequest,
	InterfaceProductRepository,
	PaginatedResponse,
	PaginationRequest,
	ProductCardDTO,
} from "@marketplace/shared-packages";
import { mapProducts } from "../../support/product.helpers";
import type { CurrencyService } from "@/common/service/convert-currency-service";

export class UseCaseProductRetrievalAll
	implements InterfaceUseCaseProductRetrievalAll
{
	constructor(private dependencies: Dependencies) {}
	async execute(req: RequestModel): Promise<ResponseModel> {
		const { productRepository, currencyService } = this.dependencies;
		const response = await productRepository.getPaginated(req);
		const mappedResponse = await mapProducts(
			response.items,
			req.currency,
			currencyService,
		);

		return {
			items: mappedResponse,
			size: response.size,
			nextPage: response.nextPage,
			total: response.total,
		};
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
	currencyService: CurrencyService;
};

type ResponseModel = PaginatedResponse<ProductCardDTO>;
type RequestModel = PaginationRequest &
	Required<Pick<CommonRequest, "currency">>;

export type InterfaceUseCaseProductRetrievalAll = InterfaceUseCase<
	RequestModel,
	ResponseModel
>;
