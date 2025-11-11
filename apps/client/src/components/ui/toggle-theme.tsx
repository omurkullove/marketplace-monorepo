import { useGlobalStore } from "@/core/state/stores/global-store";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
	const globalStore = useGlobalStore();

	const theme = globalStore.use("theme");

	const handleToggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		globalStore.setState("theme", newTheme);
	};

	return (
		<button
			type="button"
			onClick={handleToggleTheme}
			className="flex items-center justify-center w-6 h-6  md:w-10 md:h-10 rounded-full bg-button-primary hover:bg-button-hover transition-colors duration-300 cursor-pointer"
		>
			{theme === "light" ? (
				<Moon className="h-3 w-3 md:w-5 md:h-5 text-white" />
			) : (
				<Sun className="h-3 w-3 md:w-5 md:h-5 text-white" />
			)}
		</button>
	);
};

export default ToggleTheme;
