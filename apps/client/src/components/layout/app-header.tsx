import { PAGE } from "@/lib/infrastructure/pages";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "../ui/toggle-theme";
import CurrencyDropdown from "../ui/currency-dropdown";

const AppHeader = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`w-full bg-background-primary fixed top-0 left-0 z-50 border-b border-b-border transition-shadow duration-700 px-5 ${
				scrolled ? "shadow-md" : ""
			}`}
		>
			<div className="relative max-w-[1200px] mx-auto px-4 py-7 flex items-baseline sm:items-center sm:justify-center justify-start">
				<Link
					to={PAGE.HOME}
					className="text-text-primary text-md sm:text-xl font-semibold hover:text-button-hover duration-300 max-w-[120px] sm:max-w-full wrap-break-word"
				>
					Marketplace Mockup
				</Link>

				<div className="absolute right-0 md:right-8 flex items-center gap-2">
					<ToggleTheme />
					<CurrencyDropdown />
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
