type ExtractParams<Path extends string> =
	Path extends `${string}:${infer Param}/${infer Rest}`
		? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
		: Path extends `${string}:${infer Param}`
			? { [K in Param]: string }
			: never;

export const PAGE = {
	HOME: "/",
	PRODUCT_DETAILS: "/products/:id",
	NOT_FOUND: "*",
} as const;

export type PageKey = keyof typeof PAGE;
export type PageValue = (typeof PAGE)[PageKey];

export type PageParams = {
	[K in PageKey]: ExtractParams<(typeof PAGE)[K]>;
};
