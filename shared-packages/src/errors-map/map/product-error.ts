import { ProductErrorCode } from "../../types/error-types/codes/error-products-codes";
import type { AppErrorJSON } from "../../types/error-types/errors-types";
import { HttpStatus } from "../../types/http-types/http-status";

export const ProductErrorMap: Record<ProductErrorCode, AppErrorJSON> = {
	[ProductErrorCode.NOT_FOUND]: {
		status: HttpStatus.NOT_FOUND,
		message: "Product not found",
		code: ProductErrorCode.NOT_FOUND,
	},
};
