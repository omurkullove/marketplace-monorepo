import type {
	InterfaceProductRepository,
	ProductDocument,
} from "@marketplace/shared-packages";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { COLLECTION } from "../collection/collection";

export class ProductRepository
	implements InterfaceProductRepository<ProductDocument>
{
	constructor(private dependencies: Dependencies) {}
	getById(id: string): Promise<ProductDocument | null> {
		throw new Error("Method not implemented.");
	}

	async getAll(): Promise<ProductDocument[]> {
		const { db } = this.dependencies;
		const data = await db.getAll(COLLECTION.PRODUCTS);
		return data;
	}
}

type Dependencies = {
	db: InterfaceDatabaseRepository;
};
