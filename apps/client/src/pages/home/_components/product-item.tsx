import Rating from "@/components/ui/rating";
import { formatDeliveryDate } from "@/lib/helpers/formate-delivery-date";
import { formatNumber } from "@/lib/helpers/formate-number";
import { buildRoute } from "@/lib/helpers/route-helpers";
import type { ProductCardDTO } from "@marketplace/shared-packages";
import { Link } from "react-router-dom";
import { useState } from "react";
import imagePlaceholder from "../../../../public/image-placeholder.jpg";

type Props = {
	item: Partial<ProductCardDTO>;
};

const ProductItem = ({ item }: Props) => {
	const [imgSrc, setImgSrc] = useState(item?.photoURL || imagePlaceholder);

	return (
		<Link to={buildRoute("PRODUCT_DETAILS", { id: item?.id || "" })}>
			<div
				className="shadow-md bg-background-product-card rounded-xl p-2 xs:p-3 flex flex-col overflow-hidden group border border-border-product-card
                transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
			>
				<div className="w-full aspect-4/3 rounded-xl overflow-hidden">
					<img
						src={imgSrc}
						alt={item?.name || "product-image"}
						className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
						onError={() => setImgSrc(imagePlaceholder)}
					/>
				</div>

				<p className="text-text-primary text-[12px] xs:text-sm truncate line-clamp-1 font-bold max-w-full mt-1 xs:mt-2">
					{item?.name}
				</p>

				<p className="font-bold text-button-primary text-[12px] xs:text-sm my-1">
					{formatNumber(item?.price, item?.currency)}
				</p>

				<Rating value={item?.rating || 0} size={10} />

				<p className="text-text-secondary text-[10px] xs:text-xs">
					In stock: {item?.in_stock}
				</p>

				<p className="text-text-secondary text-[10px] xs:text-xs line-clamp-1">
					Delivery: {formatDeliveryDate(item?.nearest_delivery || "")}
				</p>
			</div>
		</Link>
	);
};

export default ProductItem;
