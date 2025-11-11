import type { Currency } from "@marketplace/shared-packages";

const localeMap: Record<Currency, string> = {
	RUB: "ru-RU",
	KGS: "ky-KG",
	USD: "en-US",
	EUR: "de-DE",
};

export function formatNumber(value = 0, currency?: Currency): string {
	const locale = currency ? localeMap[currency] : "en-US";

	return new Intl.NumberFormat(locale, {
		style: currency ? "currency" : "decimal",
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	}).format(value);
}
