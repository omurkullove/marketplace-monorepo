import type { Theme } from "@/lib/types/types";
import { Store } from "../store";
import type { Currency } from "@marketplace/shared-packages";
import { useDeps } from "../deps-context";

export type GlobalState = {
	theme: Theme;
	activeCurrency: Currency;
};

export class GlobalStore extends Store<GlobalState> {
	constructor() {
		const initialTheme = (localStorage.getItem("theme") as Theme) || "light";
		const initialActiveCurrency =
			(localStorage.getItem("currency") as Currency) || "USD";

		super({
			theme: initialTheme,
			activeCurrency: initialActiveCurrency,
		});

		if (typeof document !== "undefined" && document.documentElement) {
			document.documentElement.setAttribute("data-theme", initialTheme);
			localStorage.setItem("currency", initialActiveCurrency);
		}

		this.subscribe("theme", (theme) => {
			if (typeof document !== "undefined" && document.documentElement) {
				document.documentElement.setAttribute("data-theme", theme);
			}
			localStorage.setItem("theme", theme);
		});

		this.subscribe("activeCurrency", (currency) => {
			localStorage.setItem("currency", currency);
		});
	}
}

export const useGlobalStore = () => useDeps().globalStore;
