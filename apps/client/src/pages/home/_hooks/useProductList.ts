import type { ProductCardDTO } from "@marketplace/shared-packages";
import { useEffect, useRef } from "react";

type Props = {
	onLoadMore: () => void;
	isFetchingMore: boolean;
	hasMore: boolean;
	items: ProductCardDTO[];
};

export function useProductList({
	onLoadMore,
	hasMore,
	isFetchingMore,
	items,
}: Props) {
	const containerRef = useRef<HTMLDivElement>(null);
	const handleFetchNext = () => {
		if (isFetchingMore || !hasMore) return;
		onLoadMore();
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!hasMore || isFetchingMore) return;

		const checkHeightAndFetch = () => {
			if (!containerRef.current) return;
			const contentHeight = containerRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;

			if (contentHeight < viewportHeight) {
				onLoadMore();
			}
		};

		checkHeightAndFetch();
		window.addEventListener("resize", checkHeightAndFetch);
		return () => window.removeEventListener("resize", checkHeightAndFetch);
	}, [items, hasMore, isFetchingMore, onLoadMore]);

	return { handleFetchNext, containerRef };
}
