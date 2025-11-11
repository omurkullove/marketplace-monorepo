export const getRatingColor = (value: number) => {
	if (value >= 4.5) return "var(--color-rating-high)";
	if (value >= 3) return "var(--color-rating-medium)";
	return "var(--color-rating-low)";
};
