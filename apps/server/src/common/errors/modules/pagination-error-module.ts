import type { ErrorModule } from "@/common/interface/error/error-module-interface";
import {
	CommonErrorCode,
	PaginationErrorCode,
} from "@marketplace/shared-packages";
import { AppError } from "../config/app-error";

type ExternalError = { code?: string; message?: string };

export const PaginationErrorModule: ErrorModule = {
	registerErrors(factory) {
		factory.registerMapper((error: ExternalError) => {
			if (!error?.code) return null;

			switch (error.code) {
				case PaginationErrorCode.INVALID_CURSOR_VALUE:
					return new AppError(PaginationErrorCode.INVALID_CURSOR_VALUE);

				case PaginationErrorCode.INVALID_LIMIT_VALUE:
					return new AppError(PaginationErrorCode.INVALID_LIMIT_VALUE);

				case PaginationErrorCode.INVALID_QUERY_OBJECT:
					return new AppError(PaginationErrorCode.INVALID_QUERY_OBJECT);

				default:
					return new AppError(CommonErrorCode.NOT_HANDLED_ERROR);
			}
		});
	},
};
