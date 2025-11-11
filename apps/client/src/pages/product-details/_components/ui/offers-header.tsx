import type { ReactNode } from "react";
import type { ProductOffersSortRequest } from "@marketplace/shared-packages";

type Props = {
	handleSort: (field: keyof ProductOffersSortRequest) => void;
	renderArrow: (field: keyof ProductOffersSortRequest) => ReactNode;
};

const OffersHeader = ({ handleSort, renderArrow }: Props) => {
	return (
		<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-6 gap-2 sm:gap-0">
			<h2 className="text-lg sm:text-xl font-semibold text-text-primary">
				Offers
			</h2>
			<div className="flex gap-2 flex-wrap">
				<button
					type="button"
					onClick={() => handleSort("byPrice")}
					className="px-2 py-1 sm:px-4 sm:py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors font-medium text-xs sm:text-sm	cursor-pointer"
				>
					Sort by Price {renderArrow("byPrice")}
				</button>
				<button
					type="button"
					onClick={() => handleSort("byDelivery")}
					className="px-2 py-1 sm:px-4 sm:py-2 bg-button-primary text-white rounded-lg hover:bg-button-hover transition-colors font-medium text-xs sm:text-sm cursor-pointer"
				>
					Sort by Date {renderArrow("byDelivery")}
				</button>
			</div>
		</div>
	);
};

export default OffersHeader;
