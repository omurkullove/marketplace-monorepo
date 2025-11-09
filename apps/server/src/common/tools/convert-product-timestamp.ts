import type { ProductDocument } from "@marketplace/shared-packages";
import { Timestamp } from "firebase-admin/firestore";

export function convertProductTimestamps(
	product: ProductDocument,
): ProductDocument {
	return {
		...product,
		offers: product.offers.map((offer) => ({
			...offer,
			nearest_delivery:
				offer.nearest_delivery instanceof Timestamp
					? offer.nearest_delivery.toDate()
					: offer.nearest_delivery,
		})),
	};
}
