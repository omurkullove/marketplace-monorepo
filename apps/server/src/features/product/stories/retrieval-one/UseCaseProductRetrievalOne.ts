import { AppError, type InterfaceUseCase } from "@/common";
import type { CurrencyService } from "@/common/service/convert-currency-service";
import {
	ProductErrorCode,
	type CommonRequest,
	type InterfaceProductRepository,
	type ProductDocument,
} from "@marketplace/shared-packages";
import { mapOffers } from "../../support/product.helpers";

export class UseCaseProductRetrievalOne
	implements InterfaceUseCaseProductRetrievalOne
{
	constructor(private dependencies: Dependencies) {}
	async execute(req: RequestModel): Promise<ProductDocument> {
		const { productRepository, currencyService } = this.dependencies;
		const response = await productRepository.getById(req.id);

		if (!response) throw new AppError(ProductErrorCode.NOT_FOUND);

		const mappedOffers = await mapOffers(
			response.offers,
			req.currency,
			currencyService,
		);

		return { ...response, offers: mappedOffers };
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
	currencyService: CurrencyService;
};

type RequestModel = {
	id: string;
} & Required<Pick<CommonRequest, "currency">>;

type ResponseModel = ProductDocument;

export type InterfaceUseCaseProductRetrievalOne = InterfaceUseCase<
	RequestModel,
	ResponseModel
>;
