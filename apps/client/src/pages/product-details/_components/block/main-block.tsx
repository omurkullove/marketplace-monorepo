import Rating from "@/components/ui/rating";
import { getRatingColor } from "@/lib/helpers/get-ratting-color";
import type { ProductDocument } from "@marketplace/shared-packages";
import imagePlaceholder from "../../../../../public/image-placeholder.jpg";
import { useState } from "react";

type Props = {
	data: ProductDocument;
};

const MainBlock = ({ data }: Props) => {
	const [imgSrc, setImgSrc] = useState(data?.photoURL || imagePlaceholder);

	const averageRating = data.offers.length
		? data.offers.reduce((sum, o) => sum + o.rating, 0) / data.offers.length
		: 0;

	return (
		<div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 bg-background-secondary p-3 sm:p-4 lg:p-8 rounded-2xl shadow-md border border-border mt-4">
			<div className="w-full lg:w-1/3 h-48 sm:h-60 lg:h-[400px] rounded-xl overflow-hidden bg-background-product-card border border-border-product-card flex justify-center items-center">
				<img
					src={imgSrc}
					alt={data.name}
					className="w-full h-full object-contain"
					onError={() => setImgSrc(imagePlaceholder)}
				/>
			</div>

			<div className="flex-1 flex flex-col justify-between">
				<div className="mb-3 sm:mb-4">
					<div className="flex-col flex md:flex-row gap-2 items-start md:items-center mb-4 md:mb-0">
						<h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-text-primary flex items-center gap-1 sm:gap-2 lg:gap-3">
							{data.name}
						</h1>{" "}
						{data.offers.length > 0 && (
							<>
								<Rating
									value={averageRating}
									size={14}
									color={getRatingColor(averageRating)}
								/>

								<div className=" text-text-secondary text-xs sm:text-sm">
									Average rating: {averageRating.toFixed(1)} / 5 (
									{data.offers.length} offers)
								</div>
							</>
						)}
					</div>

					<p className="text-text-secondary mt-1 sm:mt-2 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm">
						{data.attributes.map((attr) => (
							<span
								key={attr}
								className="px-1 py-0.5 sm:px-2 sm:py-1 bg-background-product-card border border-border-product-card rounded-md text-xs sm:text-sm"
							>
								{attr}
							</span>
						))}
					</p>
				</div>
			</div>
		</div>
	);
};

export default MainBlock;
