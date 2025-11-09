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
			req.limit,
			req?.cursor,
		);

		return {
			items: snapshot.items,
			nextCursor: snapshot.nextCursor,
			limit: snapshot.limit,
		};
	}

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
