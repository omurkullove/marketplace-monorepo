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
};
