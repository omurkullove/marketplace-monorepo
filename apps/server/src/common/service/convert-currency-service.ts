import { Convert } from "easy-currencies";
import { AppError } from "../errors/config/app-error";
import { CommonErrorCode } from "@marketplace/shared-packages";
import type { InterfaceConvertCurrencyService } from "./service-interface";

type CacheEntry = {
	rate: number;
	timestamp: number;
};

export class CurrencyService implements InterfaceConvertCurrencyService {
	private cache: Record<string, CacheEntry> = {};
	private CACHE_TTL = 60 * 60 * 1000;

	private async fetchRate(from: string, to: string): Promise<number> {
		try {
			const value = await Convert(1).from(from).to(to);

			if (typeof value !== "number" || Number.isNaN(value) || value <= 0) {
				throw new Error(`Invalid conversion rate from ${from} to ${to}`);
			}

			return value;
		} catch (err) {
			throw new AppError(
				CommonErrorCode.INTERNAL_ERROR,
				`Error while fetching currency rate from ${from} to ${to}: ${err}`,
			);
		}
	}

	private async getRate(from: string, to: string): Promise<number> {
		const cacheKey = `${from}_${to}`;
		const now = Date.now();

		const cached = this.cache[cacheKey];
		if (cached && now - cached.timestamp < this.CACHE_TTL) {
			return cached.rate;
		}

		const rate = await this.fetchRate(from, to);

		this.cache[cacheKey] = { rate, timestamp: now };
		return rate;
	}

	public async convert(
		amount: number,
		from: string,
		to: string,
	): Promise<number> {
		if (from === to) return Math.round(amount * 100) / 100;

		const rate = await this.getRate(from, to);

		const converted = amount * rate;
		return Math.round(converted * 100) / 100;
	}
}
