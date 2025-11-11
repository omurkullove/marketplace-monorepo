import type { ProductOffer } from "@marketplace/shared-packages";
import { useDeps } from "../deps-context";
import { Store } from "../store";

export type ProductState = {
	offers: ProductOffer[];
};

export class ProductStore extends Store<ProductState> {
	constructor() {
		super({
			offers: [],
		});
	}
}

export const useProductStore = () => {
	return useDeps().launchStore("productStore", ProductStore);
};
