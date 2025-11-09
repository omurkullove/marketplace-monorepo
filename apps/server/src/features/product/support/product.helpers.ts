import type {
	ProductCardDTO,
	ProductDocument,
} from "@marketplace/shared-packages";

export const mapProducts = (data: ProductDocument[]): ProductCardDTO[] => {
	return data.map((product) => {
		if (!product.offers || product.offers.length === 0)
			throw new Error(`Product ${product.id} has no offers`);

		const cheapestOffer = product.offers.reduce((prev, curr) =>
			curr.price < prev.price ? curr : prev,
		);

		return {
			id: product.id,
			photoURL: product.photoURL,
			name: product.name,
			price: cheapestOffer.price,
			currency: cheapestOffer.currency,
			in_stock: cheapestOffer.in_stock,
			nearest_delivery: cheapestOffer.nearest_delivery,
		};
	});
};
