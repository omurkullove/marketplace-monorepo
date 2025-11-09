import {
	type AppErrorJSON,
	CommonErrorCode,
	ErrorMap,
	type ErrorCode,
} from "@marketplace/shared-packages";

export class AppError extends Error {
	public readonly code: ErrorCode;
	public readonly status: number;

	constructor(code: ErrorCode, customMessage?: string) {
		console.log(code);
		const errorData = ErrorMap[code] ?? ErrorMap.UNKNOWN_ERROR;
		super(customMessage ?? errorData.message);

		this.code = code in ErrorMap ? code : CommonErrorCode.UNKNOWN_ERROR;
		this.status = errorData?.status ?? 500;

		Error.captureStackTrace(this, this.constructor);
	}

	toJSON(): AppErrorJSON {
		return {
			code: this.code,
			message: this.message,
			status: this.status,
		};
	}
}
