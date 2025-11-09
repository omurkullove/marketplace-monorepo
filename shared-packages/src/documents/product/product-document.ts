export type ProductOffer = {
	id: string;
	price: number;
	sellerName: string;
	rating: number;
	nearest_delivery: Date;
};

export type ProductDocument = {
	id: string;
	photoURL: string;
	name: string;
	attributes: string[];
	offers: ProductOffer[];
};
