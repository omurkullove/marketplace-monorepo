import type { SortDirection } from "./common-dto";

export type ProductOffersSortRequest = {
	byDelivery?: SortDirection;
	byPrice?: SortDirection;
};
