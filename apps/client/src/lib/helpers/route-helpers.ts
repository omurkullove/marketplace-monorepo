import type { CommonRequestOptions, ROUTE } from "@marketplace/shared-packages";
import { PAGE, type PageKey, type PageParams } from "../infrastructure/pages";

export function buildPath(path: ROUTE, params?: CommonRequestOptions) {
	if (!params) return path;
	let result = path;
	for (const [key, value] of Object.entries(params)) {
		result = result.replace(
			`:${key}`,
			encodeURIComponent(String(value)),
		) as ROUTE;
	}
	return result;
}

export function buildQuery(url: string, query?: CommonRequestOptions) {
	if (!query || Object.keys(query).length === 0) return url;
	const queryString = new URLSearchParams(
		Object.entries(query).map(([k, v]) => [k, String(v)]),
	).toString();
	return `${url}?${queryString}`;
}

export function buildRoute<K extends PageKey>(
	page: K,
	params: PageParams[K] extends never ? undefined : PageParams[K],
): string {
	let path = PAGE[page] as string;

	if (params) {
		for (const key in params) {
			path = path.replace(`:${key}`, (params as Record<string, string>)[key]);
		}
	}

	return path;
}
