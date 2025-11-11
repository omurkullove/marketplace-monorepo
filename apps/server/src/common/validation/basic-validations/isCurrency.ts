import { CURRENCIES, type Currency } from "@marketplace/shared-packages";

export function isCurrency(value: unknown): value is Currency {
	return typeof value === "string" && CURRENCIES.includes(value as Currency);
}
