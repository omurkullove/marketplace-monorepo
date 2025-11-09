import { PaginationErrorCode } from "../../types/error-types/codes/error-pagination-codes";
import type { AppErrorJSON } from "../../types/error-types/errors-types";
import { HttpStatus } from "../../types/http-types/http-status";

export const PaginationErrorMap: Record<PaginationErrorCode, AppErrorJSON> = {
	[PaginationErrorCode.INVALID_CURSOR_VALUE]: {
		status: HttpStatus.BAD_REQUEST,
		message: "The provided cursor is invalid or malformed",
		code: PaginationErrorCode.INVALID_CURSOR_VALUE,
	},
	[PaginationErrorCode.INVALID_LIMIT_VALUE]: {
		status: HttpStatus.BAD_REQUEST,
		message: "The provided limit value is invalid",
		code: PaginationErrorCode.INVALID_LIMIT_VALUE,
	},
	[PaginationErrorCode.INVALID_QUERY_OBJECT]: {
		status: HttpStatus.BAD_REQUEST,
		message: "The provided query object is invalid",
		code: PaginationErrorCode.INVALID_QUERY_OBJECT,
	},
};
