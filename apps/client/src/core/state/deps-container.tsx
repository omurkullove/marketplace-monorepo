import { GlobalStore } from "./stores/global-store";
import type { ProductState, ProductStore } from "./stores/product-store";

type StoreKey = "productStore";

type StoreMap = {
	productStore: ProductStore;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type StoreConstructor<T> = new (...args: any[]) => T;

export class DepsContainer {
	public readonly globalStore: GlobalStore;
	private readonly routeStores = new Map<StoreKey, unknown>();

	constructor(globalStore?: GlobalStore) {
		this.globalStore = globalStore ?? new GlobalStore();
	}

	launchStore<K extends StoreKey>(
		key: K,
		StoreClass: StoreConstructor<StoreMap[K]>,
	): StoreMap[K] {
		if (!this.routeStores.has(key)) {
			console.log(`Создаем новый экземпляр store: ${key}`);
			this.routeStores.set(key, new StoreClass());
		}
		return this.routeStores.get(key) as StoreMap[K];
	}

	clearRouteScopedDeps() {
		console.log("Очищаем route-scoped stores...");
		this.routeStores.clear();
	}
}
