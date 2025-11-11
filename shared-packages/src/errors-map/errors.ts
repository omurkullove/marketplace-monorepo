import { CommonErrorMap } from "./map/common-errors";
import { PaginationErrorMap } from "./map/pagination-errors";
import { ProductErrorMap } from "./map/product-error";

export const ErrorMap = {
	...CommonErrorMap,
	...PaginationErrorMap,
	...ProductErrorMap,
};
