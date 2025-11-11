import { CommonErrorCode } from "../../types/error-types/codes/error-common-codes";
import type { AppErrorJSON } from "../../types/error-types/errors-types";
import { HttpStatus } from "../../types/http-types/http-status";

export const CommonErrorMap: Record<CommonErrorCode, AppErrorJSON> = {
	[CommonErrorCode.UNKNOWN_ERROR]: {
		status: HttpStatus.INTERNAL,
		message: "Unknown error",
		code: CommonErrorCode.UNKNOWN_ERROR,
	},
	[CommonErrorCode.NOT_HANDLED_ERROR]: {
		status: HttpStatus.INTERNAL,
		message: "This error not handled by server: ",
		code: CommonErrorCode.NOT_HANDLED_ERROR,
	},
	[CommonErrorCode.INTERNAL_ERROR]: {
		status: HttpStatus.INTERNAL,
		message: "Internal server error",
		code: CommonErrorCode.INTERNAL_ERROR,
	},

	[CommonErrorCode.INVALID_QUERY_OBJECT]: {
		status: HttpStatus.BAD_REQUEST,
		message: "Invalid query object",
		code: CommonErrorCode.INVALID_QUERY_OBJECT,
	},

	[CommonErrorCode.MISSING_FIELD]: {
		status: HttpStatus.BAD_REQUEST,
		message: "Missing required fields",
		code: CommonErrorCode.MISSING_FIELD,
	},

	[CommonErrorCode.INVALID_VALUE]: {
		status: HttpStatus.BAD_REQUEST,
		message: "Invalid request value",
		code: CommonErrorCode.INVALID_VALUE,
	},
};
