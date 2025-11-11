import type {
	InterfaceProductRepository,
	PaginatedResponse,
	PaginationRequest,
	ProductDocument,
} from "@marketplace/shared-packages";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { COLLECTION } from "../collection/collection";

export class ProductRepository
	implements InterfaceProductRepository<ProductDocument>
{
	constructor(private dependencies: Dependencies) {}

	async getPaginated(
		req: PaginationRequest,
	): Promise<PaginatedResponse<ProductDocument>> {
		const { db } = this.dependencies;
		const snapshot = await db.getPaginated(
			COLLECTION.PRODUCTS,
			req.size,
			req?.page,
		);

		return {
			items: snapshot.items,
			nextPage: snapshot.nextPage,
			size: snapshot.size,
			total: snapshot.total,
		};
	}

	async getById(id: string): Promise<ProductDocument | null> {
		const { db } = this.dependencies;
		const data = await db.getById(COLLECTION.PRODUCTS, id);
		return data;
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
