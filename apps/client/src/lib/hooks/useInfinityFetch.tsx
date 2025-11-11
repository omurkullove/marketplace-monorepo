import { useState, useEffect, useRef, useCallback } from "react";
import type {
	CommonRequestOptions,
	PaginatedResponse,
	ROUTE,
} from "@marketplace/shared-packages";
import { buildQuery } from "../helpers/route-helpers";
import { SERVER_API_ENDPOINT, SERVER_API_URL } from "../env/env";

export function useInfinityFetch<T>(
	path: ROUTE,
	options: CommonRequestOptions,
) {
	const [items, setItems] = useState<T[]>([]);
	const [hasMore, setHasMore] = useState(false);
	const [isInitialLoading, setIsInitialLoading] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [page, setPage] = useState(1);

	const prevOptionsRef = useRef<CommonRequestOptions | null>(null);

	const fetchNext = useCallback(
		async (reset = false) => {
			const isFirstPage = reset || page === 1;

			if (isFirstPage) setIsInitialLoading(true);
			else setIsFetchingMore(true);

			try {
				const currentPage = isFirstPage ? 1 : page;
				const url = `${SERVER_API_URL}${SERVER_API_ENDPOINT}${path}`;
				const fullUrl = buildQuery(url, { ...options, page: currentPage });
				const res = await fetch(fullUrl);
				const data = (await res.json()) as PaginatedResponse<T>;
				if (!res.ok) return;

				setItems((prev) =>
					isFirstPage ? data.items : [...prev, ...data.items],
				);

				if (data.nextPage) {
					setPage(data.nextPage);
					setHasMore(true);
				} else {
					setHasMore(false);
				}
			} catch (err) {
				console.error("Error fetching items:", err);
			} finally {
				if (isFirstPage) setIsInitialLoading(false);
				else setIsFetchingMore(false);
			}
		},
		[options, page, path],
	);

	useEffect(() => {
		const optionsChanged =
			JSON.stringify(prevOptionsRef.current) !== JSON.stringify(options);
		if (optionsChanged) {
			prevOptionsRef.current = options;
			setPage(1);
			fetchNext(true);
		}
	}, [options, fetchNext]);

	return {
		items,
		hasMore,
		isInitialLoading,
		isFetchingMore,
		fetchNext,
	};
}
