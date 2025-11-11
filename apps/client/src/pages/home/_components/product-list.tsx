import Loading from "@/components/ui/loading";
import ProductItem from "./product-item";
import type { ProductCardDTO } from "@marketplace/shared-packages";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProductList } from "../_hooks/useProductList";
import { SearchX } from "lucide-react";

type Props = {
	items: ProductCardDTO[];
	hasMore: boolean;
	onLoadMore: () => void;
	isFetchingMore: boolean;
	isInitialLoading: boolean;
};

const ProductList = (props: Props) => {
	const { containerRef, handleFetchNext } = useProductList(props);

	return (
		<div ref={containerRef} className="w-full h-full">
			{props.isInitialLoading ? (
				<div className="col-span-full flex justify-center items-center h-64 lg:h-80">
					<Loading />
				</div>
			) : (
				<>
					<InfiniteScroll
						dataLength={props.items.length}
						next={handleFetchNext}
						hasMore={props.hasMore}
						loader={null}
						className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4 p-2 lg:p-4"
					>
						{props.items.length ? (
							props.items.map((item) => (
								<ProductItem item={item} key={item.id} />
							))
						) : (
							<p className="text-text-secondary text-xl col-span-full text-center flex flex-col gap-2 justify-center items-center h-64 lg:h-80">
								<SearchX size={35} />
								The products list is empty
							</p>
						)}
					</InfiniteScroll>

					{props.isFetchingMore && (
						<div className="col-span-full flex justify-center items-center mt-4">
							<Loading />
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ProductList;
