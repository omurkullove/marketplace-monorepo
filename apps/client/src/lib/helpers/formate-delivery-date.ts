import { addDays, format, isToday, isTomorrow } from "date-fns";

export function formatDeliveryDate(dateStr: string | Date): string {
	if (!dateStr) return "N/A";

	const parsedDate = typeof dateStr === "string" ? new Date(dateStr) : dateStr;

	const now = new Date();

	if (isToday(parsedDate)) return "Today";

	if (isTomorrow(parsedDate)) return "Tomorrow";

	const twoDaysLater = addDays(now, 2);
	if (
		parsedDate.getDate() === twoDaysLater.getDate() &&
		parsedDate.getMonth() === twoDaysLater.getMonth()
	)
		return "In 2 days";

	const hours = parsedDate.getHours();
	let partOfDay = "";
	if (hours >= 5 && hours < 12) partOfDay = "morning";
	else if (hours >= 12 && hours < 18) partOfDay = "afternoon";
	else if (hours >= 18 && hours < 23) partOfDay = "evening";

	if (partOfDay) {
		if (isTomorrow(parsedDate)) return `Tomorrow ${partOfDay}`;
		return `${format(parsedDate, "MMMM d")} ${partOfDay}`;
	}

	return format(parsedDate, "MMMM d");
}
