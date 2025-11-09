import {
	PaginationErrorCode,
	type PaginationRequest,
} from "@marketplace/shared-packages";
import { AppError } from "../errors/config/app-error";
import type { Request } from "express";

export function validatePaginatedRequest(
	query: Request["query"],
): asserts query is { limit: string; cursor?: string } {
	if (!query || typeof query !== "object" || !("limit" in query)) {
		throw new AppError(PaginationErrorCode.INVALID_QUERY_OBJECT);
	}

	if (typeof query.limit !== "string" || query.limit.trim() === "") {
		throw new AppError(PaginationErrorCode.INVALID_QUERY_OBJECT);
	}

	if (Number.isNaN(Number(query.limit))) {
		throw new AppError(PaginationErrorCode.INVALID_LIMIT_VALUE);
	}

	if (query.cursor !== undefined && typeof query.cursor !== "string") {
		throw new AppError(PaginationErrorCode.INVALID_CURSOR_VALUE);
	}
}
