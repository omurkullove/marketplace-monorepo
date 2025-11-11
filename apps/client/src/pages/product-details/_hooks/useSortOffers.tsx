import type {
	ProductOffer,
	ProductOffersSortRequest,
} from "@marketplace/shared-packages";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

export function useSortOffers(offers: ProductOffer[]) {
	const [sortState, setSortState] = useState<ProductOffersSortRequest>({
		byPrice: "asc",
	});

	const [sortedOffers, setSortedOffers] = useState(offers);

	const renderArrow = (field: keyof ProductOffersSortRequest) => {
		if (!sortState[field]) return null;
		return sortState[field] === "asc" ? (
			<ArrowUp size={16} className="inline-block ml-1" />
		) : (
			<ArrowDown size={16} className="inline-block ml-1" />
		);
	};

	const onSort = (param: ProductOffersSortRequest) => {
		setSortedOffers((prev) => {
			const newSortedOffers = [...prev];

			if (param.byPrice) {
				newSortedOffers.sort((a, b) =>
					param.byPrice === "asc" ? a.price - b.price : b.price - a.price,
				);
			}

			if (param.byDelivery) {
				newSortedOffers.sort((a, b) => {
					const dateA = new Date(a.nearest_delivery).getTime();
					const dateB = new Date(b.nearest_delivery).getTime();
					return param.byDelivery === "asc" ? dateA - dateB : dateB - dateA;
				});
			}

			return newSortedOffers;
		});
	};

	const handleSort = (field: keyof ProductOffersSortRequest) => {
		const current = sortState[field];
		const newDirection = current === "asc" ? "desc" : "asc";

		const newSort: ProductOffersSortRequest = {
			byPrice: undefined,
			byDelivery: undefined,
			[field]: newDirection,
		};

		setSortState(newSort);
		onSort(newSort);
	};

	return { renderArrow, sortedOffers, handleSort };
}
