export type ProductOffer = {
	id: string;
	price: number;
	sellerName: string;
	rating: number;
	nearest_delivery: Date;
	currency: string;
	in_stock: number;
};

export type ProductDocument = {
	id: string;
	photoURL: string;
	name: string;
	attributes: string[];
	offers: ProductOffer[];
};

export type ProductCardDTO = {
	id: string;
	photoURL: string;
	name: string;
	price: number;
	currency: string;
	in_stock: number;
	nearest_delivery: Date;
};
