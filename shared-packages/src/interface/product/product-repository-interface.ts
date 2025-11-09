import type { ProductDocument } from "../../documents/product/product-document";

export interface InterfaceProductRepository<TData = ProductDocument> {
	getById(id: string): Promise<TData | null>;
	getAll(): Promise<TData[]>;
}
