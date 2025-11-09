import type { InterfaceProductRepository } from "@marketplace/shared-packages";
import {
	ProductRetrievalAllUseCase,
	type InterfaceProductRetrievalAllUseCase,
} from "../stories/retrieval/productRetrievalAllUseCase";
import { ProductRetrievalAllController } from "../stories/retrieval/productRetrievalAllController";
import type { InterfaceController } from "@/common";

export class ProductWiringFactory {
	private dependencies: Dependencies;

	constructor(dependencies: Dependencies) {
		this.dependencies = dependencies;
	}

	private collectUseCases(): ProductWiringFactoryExposes["useCase"] {
		const { productRepository } = this.dependencies;

		const productRetrievalAll = new ProductRetrievalAllUseCase({
			productRepository,
		});
		return { productRetrievalAll };
	}

	private collectControllers(): ProductWiringFactoryExposes["controller"] {
		const useCase = this.collectUseCases();

		const productRetrievalAll = new ProductRetrievalAllController({
			productRetrievalAllUseCase: useCase.productRetrievalAll,
		});

		return { productRetrievalAll };
	}

	public expose(): ProductWiringFactoryExposes {
		const controller = this.collectControllers();
		const useCase = this.collectUseCases();

		return { controller, useCase };
	}
}

type Dependencies = {
	productRepository: InterfaceProductRepository;
};

type ProductWiringFactoryExposes = {
	useCase: {
		productRetrievalAll: InterfaceProductRetrievalAllUseCase;
	};
	controller: {
		productRetrievalAll: InterfaceController;
	};
};
