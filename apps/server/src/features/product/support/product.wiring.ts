import type { InterfaceProductRepository } from "@marketplace/shared-packages";

import type { InterfaceController } from "@/common";
import {
	type InterfaceUseCaseProductRetrievalAll,
	UseCaseProductRetrievalAll,
} from "../stories/retrieval/UseCaseProductRetrievalAll";
import { ControllerProductRetrievalAll } from "../stories/retrieval/ControllerProductRetrievalAll";
import {
	UseCaseProductRetrievalOne,
	type InterfaceUseCaseProductRetrievalOne,
} from "../stories/retrieval-one/UseCaseProductRetrievalOne";
import { ControllerProductRetrievalOne } from "../stories/retrieval-one/ControllerProductRetrievalOne";
import type { CurrencyService } from "@/common/service/convert-currency-service";

export class ProductWiringFactory {
	private dependencies: Dependencies;

	constructor(dependencies: Dependencies) {
		this.dependencies = dependencies;
	}

	private collectUseCases(): ProductWiringFactoryExposes["useCase"] {
		const { productRepository, currencyService } = this.dependencies;

		const productRetrievalAll = new UseCaseProductRetrievalAll({
			productRepository,
			currencyService,
		});

		const productRetrievalOne = new UseCaseProductRetrievalOne({
			productRepository,
			currencyService,
		});

		return { productRetrievalAll, productRetrievalOne };
	}

	private collectControllers(): ProductWiringFactoryExposes["controller"] {
		const useCase = this.collectUseCases();

		const productRetrievalAll = new ControllerProductRetrievalAll({
			productRetrievalAllUseCase: useCase.productRetrievalAll,
		});

		const productRetrievalOne = new ControllerProductRetrievalOne({
			productRetrievalOneUseCase: useCase.productRetrievalOne,
		});

		return { productRetrievalAll, productRetrievalOne };
	}

	public expose(): ProductWiringFactoryExposes {
		const controller = this.collectControllers();
		const useCase = this.collectUseCases();

		return { controller, useCase };
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
	currencyService: CurrencyService;
};

type ProductWiringFactoryExposes = {
	useCase: {
		productRetrievalAll: InterfaceUseCaseProductRetrievalAll;
		productRetrievalOne: InterfaceUseCaseProductRetrievalOne;
	};
	controller: {
		productRetrievalAll: InterfaceController;
		productRetrievalOne: InterfaceController;
	};
};
