import type { CommonErrorCode } from "./codes/error-common-codes";
import type { PaginationErrorCode } from "./codes/error-pagination-codes";

export type ErrorCode = CommonErrorCode | PaginationErrorCode;

export type AppErrorJSON = {
	code: ErrorCode;
	message: string;
	status: number;
};
