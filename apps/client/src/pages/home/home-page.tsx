import ProductList from "./_components/product-list";
import { ROUTE, type ProductCardDTO } from "@marketplace/shared-packages";
import { useInfinityFetch } from "@/lib/hooks/useInfinityFetch";
import { useGlobalStore } from "@/core/state/stores/global-store";

const HomePage = () => {
	const globalStore = useGlobalStore();
	const currency = globalStore.use("activeCurrency");

	const { items, fetchNext, hasMore, isFetchingMore, isInitialLoading } =
		useInfinityFetch<ProductCardDTO>(ROUTE.PRODUCTS, {
			currency,
			size: 30,
		});

	return (
		<main className="relative pt-3 pb-5 h-full">
			<ProductList
				items={items}
				onLoadMore={fetchNext}
				hasMore={hasMore}
				isFetchingMore={isFetchingMore}
				isInitialLoading={isInitialLoading}
			/>
		</main>
	);
};

export default HomePage;
