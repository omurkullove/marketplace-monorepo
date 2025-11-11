export type PaginatedResponse<T> = {
	nextPage: number | null;
	size: number;
	items: T[];
	total: number;
};

export type PaginationRequest = {
	size: number;
	page: number;
};
