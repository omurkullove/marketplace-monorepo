import type { ProductOffer } from "@marketplace/shared-packages";
import OffersHeader from "../ui/offers-header";
import OffersTable from "../ui/offers-table";
import OffersListMobile from "../ui/offers-list-mobile";
import { useSortOffers } from "../../_hooks/useSortOffers";

type Props = {
	offers: ProductOffer[];
};

const OffersBlock = ({ offers }: Props) => {
	const { renderArrow, sortedOffers, handleSort } = useSortOffers(offers);

	return (
		<div className="bg-background-secondary p-3 sm:p-6 rounded-2xl shadow-md border border-border">
			<OffersHeader renderArrow={renderArrow} handleSort={handleSort} />
			<div className="hidden sm:block overflow-x-auto">
				<OffersTable offers={sortedOffers} />
			</div>
			<div className="sm:hidden flex flex-col gap-3">
				<OffersListMobile offers={sortedOffers} />
			</div>
		</div>
	);
};

export default OffersBlock;
