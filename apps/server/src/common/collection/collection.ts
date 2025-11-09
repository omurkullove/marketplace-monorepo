import type { ProductDocument } from "@marketplace/shared-packages";

export enum COLLECTION {
	PRODUCTS = "products",
}

export interface FirestoreCollections {
	[COLLECTION.PRODUCTS]: ProductDocument;
}
