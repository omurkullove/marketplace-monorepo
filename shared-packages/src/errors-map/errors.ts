import { CommonErrorMap } from "./map/common-errors";
import { PaginationErrorMap } from "./map/pagination-errors";

export const ErrorMap = {
	...CommonErrorMap,
	...PaginationErrorMap,
};
