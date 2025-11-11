import type { ErrorModule } from "@/common/interface/error/error-module-interface";
import {
	CommonErrorCode,
	ProductErrorCode,
} from "@marketplace/shared-packages";
import { AppError } from "../config/app-error";

export const ProductErrorModule: ErrorModule = {
	registerErrors(factory) {
		factory.registerMapper((error: AppError) => {
			if (!error?.code) return null;

			switch (error.code) {
				case ProductErrorCode.NOT_FOUND:
					return new AppError(ProductErrorCode.NOT_FOUND);

				default:
					return new AppError(CommonErrorCode.NOT_HANDLED_ERROR);
			}
		});
	},
};
