import type { CommonErrorCode } from "./codes/error-common-codes";
import type { PaginationErrorCode } from "./codes/error-pagination-codes";
import type { ProductErrorCode } from "./codes/error-products-codes";

export type ErrorCode =
	| CommonErrorCode
	| PaginationErrorCode
	| ProductErrorCode;

export type AppErrorJSON = {
	code: ErrorCode;
	message: string;
	status: number;
};
