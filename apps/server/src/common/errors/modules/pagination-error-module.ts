import type { ErrorModule } from "@/common/interface/error/error-module-interface";
import {
	CommonErrorCode,
	PaginationErrorCode,
} from "@marketplace/shared-packages";
import { AppError } from "../config/app-error";

export const PaginationErrorModule: ErrorModule = {
	registerErrors(factory) {
		factory.registerMapper((error: AppError) => {
			if (!error?.code) return null;

			switch (error.code) {
				case PaginationErrorCode.INVALID_PAGE_VALUE:
					return new AppError(PaginationErrorCode.INVALID_PAGE_VALUE);

				case PaginationErrorCode.INVALID_SIZE_VALUE:
					return new AppError(PaginationErrorCode.INVALID_SIZE_VALUE);

				case CommonErrorCode.INVALID_QUERY_OBJECT:
					return new AppError(CommonErrorCode.INVALID_QUERY_OBJECT);

				default:
					return new AppError(CommonErrorCode.NOT_HANDLED_ERROR);
			}
		});
	},
};
