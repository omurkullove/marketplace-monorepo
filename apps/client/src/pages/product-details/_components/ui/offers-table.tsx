import Rating from "@/components/ui/rating";
import { formatDeliveryDate } from "@/lib/helpers/formate-delivery-date";
import { formatNumber } from "@/lib/helpers/formate-number";
import { getRatingColor } from "@/lib/helpers/get-ratting-color";
import type { ProductOffer } from "@marketplace/shared-packages";

type Props = {
	offers: ProductOffer[];
};

type TableHeadCellProps = {
	title: string;
	className?: string;
};

const TableHeadCell = ({ title, className = "" }: TableHeadCellProps) => (
	<th
		className={`px-4 py-2 text-left text-text-secondary font-medium ${className}`}
	>
		{title}
	</th>
);

const OffersTable = ({ offers }: Props) => {
	if (!offers?.length) {
		return (
			<div className="text-center text-text-secondary py-6">
				No offers available
			</div>
		);
	}

	return (
		<div className="w-full overflow-x-auto">
			<table className="w-full min-w-[600px] border-collapse text-sm">
				<thead>
					<tr className="bg-background-product-card border-b border-border">
						<TableHeadCell title="Seller" className="max-w-[140px]" />
						<TableHeadCell title="Rating" />
						<TableHeadCell title="Price" />
						<TableHeadCell title="Delivery" />
						<TableHeadCell title="In stock" />
					</tr>
				</thead>

				<tbody>
					{offers.map((offer) => (
						<tr
							key={offer.id}
							className="border-b border-border hover:bg-background-product-card transition-colors"
						>
							<td
								className="px-4 py-2 font-semibold text-text-primary truncate max-w-[140px]"
								title={offer.sellerName}
							>
								{offer.sellerName}
							</td>

							<td className="px-4 py-2">
								<Rating
									value={offer.rating}
									size={14}
									color={getRatingColor(offer.rating)}
								/>
							</td>

							<td className="px-4 py-2 font-bold text-button-primary whitespace-nowrap">
								{formatNumber(offer.price, offer.currency)}
							</td>

							<td className="px-4 py-2 text-text-secondary whitespace-nowrap">
								{formatDeliveryDate(offer.nearest_delivery)}
							</td>

							<td className="px-4 py-2 text-text-secondary whitespace-nowrap">
								{offer.in_stock}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OffersTable;
