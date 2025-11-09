import type { ProductDocument } from "../documents/product-document";
import type {
	PaginatedResponse,
	PaginationRequest,
} from "../types/common-types/common-types";

export interface InterfaceProductRepository<TData = ProductDocument> {
	getById(id: string): Promise<TData | null>;
	getAll(): Promise<TData[]>;
	getPaginated(req: PaginationRequest): Promise<PaginatedResponse<TData>>;
}
