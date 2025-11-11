import { useState, useEffect, useCallback, useRef } from "react";
import {
	CommonErrorCode,
	HttpStatus,
	type AppErrorJSON,
	type CommonRequestOptions,
	type ROUTE,
} from "@marketplace/shared-packages";
import { buildPath, buildQuery } from "../helpers/route-helpers";
import { SERVER_API_ENDPOINT } from "../env/env";

type UseFetchOptions = Omit<RequestInit, "body"> & {
	pathParams?: CommonRequestOptions;
	queryParams?: CommonRequestOptions;
};

type Props<T> = {
	path: ROUTE;
	options?: UseFetchOptions;
	onError?: (error: AppErrorJSON) => void;
	onSuccess?: (data: T) => void;
	dependencies?: React.DependencyList;
};

export function useFetch<T = unknown>({
	dependencies = [],
	path,
	onError,
	onSuccess,
	options,
}: Props<T>) {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<AppErrorJSON | null>(null);
	const [loading, setLoading] = useState(false);

	const optionsRef = useRef(options);
	optionsRef.current = options;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			let finalPath = buildPath(path, optionsRef.current?.pathParams);
			finalPath = buildQuery(
				finalPath,
				optionsRef.current?.queryParams,
			) as ROUTE;

			const finalUrl = `${SERVER_API_ENDPOINT}${finalPath}`;

			const response = await fetch(finalUrl, {
				...optionsRef.current,
				headers: {
					"Content-Type": "application/json",
					...(optionsRef.current?.headers || {}),
				},
			});

			if (!response.ok) {
				onError?.((await response.json()) as AppErrorJSON);
				return;
			}

			const json = (await response.json()) as T;

			setData(json);
			onSuccess?.(json);
		} catch (err) {
			if (err instanceof Error)
				setError({
					code: CommonErrorCode.UNKNOWN_ERROR,
					message: err.message,
					status: HttpStatus.BAD_REQUEST,
				});
		} finally {
			setLoading(false);
		}
	}, [path, ...dependencies]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { data, error, loading, refetch: fetchData };
}
