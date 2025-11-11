import Rating from "@/components/ui/rating";
import { formatDeliveryDate } from "@/lib/helpers/formate-delivery-date";
import { formatNumber } from "@/lib/helpers/formate-number";
import { getRatingColor } from "@/lib/helpers/get-ratting-color";
import type { ProductOffer } from "@marketplace/shared-packages";

type Props = {
	offers: ProductOffer[];
};

const OffersListMobile = ({ offers }: Props) => (
	<>
		{offers.map((offer) => (
			<div
				key={offer.id}
				className="bg-background-product-card border border-border rounded-lg p-3 flex flex-col gap-2 shadow-sm"
			>
				<div className="flex justify-between items-center">
					<p
						className="font-semibold text-text-primary text-sm truncate"
						title={offer.sellerName}
					>
						{offer.sellerName}
					</p>
					<Rating
						value={offer.rating}
						size={12}
						color={getRatingColor(offer.rating)}
					/>
				</div>
				<p className="font-bold text-button-primary text-sm">
					Price: {formatNumber(offer.price, offer.currency)}
				</p>
				<p className="text-text-secondary text-xs">
					Delivery: {formatDeliveryDate(offer.nearest_delivery)}
				</p>
				<p className="text-text-secondary text-xs">
					In stock: {offer.in_stock}
				</p>
			</div>
		))}
	</>
);

export default OffersListMobile;
