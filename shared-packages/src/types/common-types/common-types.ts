export type PaginatedResponse<T> = {
	nextCursor: string | number | null;
	limit: number;
	items: T[];
};

export type PaginationRequest = {
	limit: number;
	cursor?: string;
};
