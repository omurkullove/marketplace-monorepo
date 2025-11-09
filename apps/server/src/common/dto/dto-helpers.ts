export function getRandomDeliveryThisWeek(): Date {
	const now = new Date();
	const dayOfWeek = now.getDay();
	const monday = new Date(now);
	monday.setDate(now.getDate() - dayOfWeek + 1);
	const sunday = new Date(monday);
	sunday.setDate(monday.getDate() + 6);

	const randomTime =
		monday.getTime() + Math.random() * (sunday.getTime() - monday.getTime());
	return new Date(randomTime);
}

export function randomStock(min = 0, max = 80) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomRating(min = 4.2, max = 5) {
	return +(Math.random() * (max - min) + min).toFixed(1);
}
