import { useId } from "react";

type RatingProps = {
	value: number;
	max?: number;
	size?: number;
	color?: string;
};

const Rating = ({
	value,
	max = 5,
	size = 20,
	color = "var(--color-rating-base)",
}: RatingProps) => {
	const stars = [];
	const uniqueId = useId();
	for (let i = 1; i <= max; i++) {
		if (value >= i) {
			stars.push(
				<svg
					key={i}
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill={color}
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>{`${value} star`}</title>
					<path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.771 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
				</svg>,
			);
		} else if (value > i - 1 && value < i) {
			const fillPercentage = (value - (i - 1)) * 100;
			const gradId = `grad-${uniqueId}-${i}`;
			stars.push(
				<svg
					key={i}
					width={size}
					height={size}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>{value ? `${value} star` : "No rating"}</title>
					<defs>
						<linearGradient id={gradId}>
							<stop offset={`${fillPercentage}%`} stopColor={color} />
							<stop offset={`${fillPercentage}%`} stopColor="#E5E7EB" />
						</linearGradient>
					</defs>
					<path
						d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.771 4.665 24 6 15.595 0 9.748l8.332-1.73z"
						fill={`url(#${gradId})`}
					/>
				</svg>,
			);
		} else {
			stars.push(
				<svg
					key={i}
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="#E5E7EB"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>{`${value} star`}</title>
					<path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.771 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
				</svg>,
			);
		}
	}

	return <div className="flex space-x-1">{stars}</div>;
};

export default Rating;
