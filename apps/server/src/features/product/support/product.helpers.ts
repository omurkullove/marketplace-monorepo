import type { CurrencyService } from "@/common/service/convert-currency-service";
import type {
	Currency,
	ProductCardDTO,
	ProductDocument,
	ProductOffer,
} from "@marketplace/shared-packages";

export const mapProducts = async (
	data: ProductDocument[],
	activeCurrency: Currency,
	currencyService: CurrencyService,
): Promise<ProductCardDTO[]> => {
	const mappedPromises = data.map(async (product) => {
		const offers = product.offers ?? [];
		if (offers.length === 0) {
			throw new Error(`Product ${product.id} has no offers`);
		}

		const cheapestOffer = offers.reduce((prev, curr) =>
			curr.price < prev.price ? curr : prev,
		);

		const totalRating = offers.reduce((sum, o) => sum + o.rating, 0);
		const average_rating = totalRating / offers.length;

		const convertedPrice = await currencyService.convert(
			cheapestOffer.price,
			cheapestOffer.currency,
			activeCurrency,
		);

		return {
			id: product.id,
			photoURL: product.photoURL,
			name: product.name,
			price: convertedPrice,
			currency: activeCurrency,
			in_stock: cheapestOffer.in_stock,
			nearest_delivery: cheapestOffer.nearest_delivery,
			rating: average_rating,
		} as ProductCardDTO;
	});

	return Promise.all(mappedPromises);
};

export const mapOffers = async (
	data: ProductOffer[],
	activeCurrency: Currency,
	currencyService: CurrencyService,
): Promise<ProductOffer[]> => {
	const mappedPromises = data.map(async (offer) => {
		const convertedPrice = await currencyService.convert(
			offer.price,
			offer.currency,
			activeCurrency,
		);

		return {
			...offer,
			price: convertedPrice,
			currency: activeCurrency,
		};
	});

	const mappedOffers = await Promise.all(mappedPromises);

	const sortedOffers = mappedOffers.sort((a, b) => a.price - b.price);

	return sortedOffers;
};
