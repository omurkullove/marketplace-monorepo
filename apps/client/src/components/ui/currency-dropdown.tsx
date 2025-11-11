import { useGlobalStore } from "@/core/state/stores/global-store";
import { CURRENCIES, type Currency } from "@marketplace/shared-packages";
import { ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const CurrencyDropdown = () => {
	const globalStore = useGlobalStore();
	const activeCurrency = globalStore.use("activeCurrency");

	const [open, setOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleSelect = (currency: Currency) => {
		globalStore.setState("activeCurrency", currency);
		setOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			ref={dropdownRef}
			className="relative inline-block w-24 sm:w-32 text-left"
		>
			<button
				type="button"
				className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-background-primary border border-border rounded-md shadow-sm flex justify-between items-center hover:bg-background-secondary focus:outline-none text-text-primary text-sm sm:text-base"
				onClick={() => setOpen((prev) => !prev)}
			>
				{activeCurrency}
				<ChevronDownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
			</button>

			{open && (
				<ul className="absolute z-10 mt-1 w-full bg-background-primary border border-border rounded-md shadow-lg max-h-48 sm:max-h-60 overflow-auto text-sm sm:text-base">
					{CURRENCIES.map((currency) => (
						<li key={currency}>
							<button
								type="button"
								className={`w-full text-left text-text-primary cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-background-secondary ${
									currency === activeCurrency
										? "font-semibold bg-transparent"
										: ""
								}`}
								onClick={() => handleSelect(currency)}
							>
								{currency}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CurrencyDropdown;
