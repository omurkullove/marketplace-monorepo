import { useEffect, useState } from "react";
import type { Theme } from "../types/types";

export function useTheme() {
	const [theme, setTheme] = useState<Theme>("light");

	const applyTheme = (newTheme: Theme) => {
		const html = document.documentElement;
		html.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
		setTheme(newTheme);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const savedTheme = (localStorage.getItem("theme") as Theme) || "light";
		applyTheme(savedTheme);
	}, []);

	return { theme, setTheme: applyTheme };
}
