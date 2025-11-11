import type { Currency } from "./currency-dto";
import type { PaginationRequest } from "./pagination-dto";
import type { ProductOffersSortRequest } from "./product-details-dto";

export type CommonRequest = {
	id?: string;
	currency?: Currency;
};

export type CommonRequestOptions =
	| PaginationRequest
	| CommonRequest
	| ProductOffersSortRequest;

export type SortDirection = "asc" | "desc";
