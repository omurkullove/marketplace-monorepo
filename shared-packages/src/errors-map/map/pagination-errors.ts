import { PaginationErrorCode } from "../../types/error-types/codes/error-pagination-codes";
import type { AppErrorJSON } from "../../types/error-types/errors-types";
import { HttpStatus } from "../../types/http-types/http-status";

export const PaginationErrorMap: Record<PaginationErrorCode, AppErrorJSON> = {
	[PaginationErrorCode.INVALID_PAGE_VALUE]: {
		status: HttpStatus.BAD_REQUEST,
		message: "The provided page is invalid or malformed",
		code: PaginationErrorCode.INVALID_PAGE_VALUE,
	},
	[PaginationErrorCode.INVALID_SIZE_VALUE]: {
		status: HttpStatus.BAD_REQUEST,
		message: "The provided size value is invalid",
		code: PaginationErrorCode.INVALID_SIZE_VALUE,
	},
};
