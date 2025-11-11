import {
	CommonErrorCode,
	PaginationErrorCode,
} from "@marketplace/shared-packages";
import { AppError } from "../errors/config/app-error";

export function validatePaginatedRequest(query: unknown): asserts query is {
	page: string;
	size: string;
} {
	if (
		!query ||
		typeof query !== "object" ||
		!("page" in query) ||
		!("size" in query)
	) {
		throw new AppError(CommonErrorCode.MISSING_FIELD);
	}

	if (Number.isNaN(Number(query.size))) {
		throw new AppError(PaginationErrorCode.INVALID_SIZE_VALUE);
	}

	if (Number.isNaN(Number(query.page))) {
		throw new AppError(PaginationErrorCode.INVALID_PAGE_VALUE);
	}
}
