import type { ProductDocument } from "@marketplace/shared-packages";
import {
	getRandomDeliveryThisWeek,
	randomRating,
	randomStock,
} from "./dto-helpers";

export const productsDTO: ProductDocument[] = [
	{
		id: "1",
		photoURL:
			"https://www.mrfix.ua/storage/65a/64e/8b1/product-product-apple-macbook-air-136-m2-space-gray-2022-z15s000d1-z15s0014h-25041-1000x1000.webp",
		name: "MacBook Air M2",
		attributes: ["Цвет: Space Gray", "Память: 256GB", "RAM: 8GB"],
		offers: [
			{
				id: "1-1",
				price: 1199,
				currency: "USD",
				sellerName: "Apple Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "2",
		photoURL: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SX679_.jpg",
		name: "Logitech MX Keys",
		attributes: [
			"Цвет: Graphite",
			"Беспроводная клавиатура",
			"Подсветка клавиш",
		],
		offers: [
			{
				id: "2-1",
				price: 99,
				currency: "USD",
				sellerName: "Amazon",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "3",
		photoURL: "https://object.pscloud.io/cms/cms/Photo/img_0_77_4237_6_1.jpg",
		name: "Samsung Galaxy S23",
		attributes: ["Цвет: Phantom Black", "Память: 128GB", "RAM: 8GB"],
		offers: [
			{
				id: "3-1",
				price: 799,
				currency: "USD",
				sellerName: "Samsung Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "4",
		photoURL:
			"https://login.kg/image/catalog/new/Aksessuary/Naushniki/Sony/WH-1000XM4/5.jpg",
		name: "Sony WH-1000XM4",
		attributes: ["Цвет: Black", "Шумоподавление", "Bluetooth 5.0"],
		offers: [
			{
				id: "4-1",
				price: 349,
				currency: "USD",
				sellerName: "Sony Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "5",
		photoURL: "https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg",
		name: "Apple iPad Air",
		attributes: ["Цвет: Silver", "Память: 64GB", "RAM: 4GB"],
		offers: [
			{
				id: "5-1",
				price: 599,
				currency: "USD",
				sellerName: "Apple Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "6",
		photoURL:
			"https://www.stuff.tv/wp-content/uploads/sites/2/2022/08/Dell-XPS-13-Plus-review-lead.jpg",
		name: "Dell XPS 13",
		attributes: ["Цвет: Silver", "Память: 512GB", "RAM: 16GB"],
		offers: [
			{
				id: "6-1",
				price: 1099,
				currency: "USD",
				sellerName: "Dell Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "7",
		photoURL: "https://gamestore.kg/wp-content/uploads/2023/09/G502X-11.jpg",
		name: "Logitech G502 Mouse",
		attributes: ["Цвет: Black", "Тип: Gaming Mouse", "Подсветка RGB"],
		offers: [
			{
				id: "7-1",
				price: 59,
				currency: "USD",
				sellerName: "Amazon",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "8",
		photoURL:
			"https://login.kg/image/cache/catalog/new/Planshety/Amazon/Kindle/Gen%2011%202024/1-1200x800.jpg",
		name: "Kindle Paperwhite",
		attributes: ["Цвет: Black", "Память: 8GB", 'Экран: 6"'],
		offers: [
			{
				id: "8-1",
				price: 129,
				currency: "USD",
				sellerName: "Amazon",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "9",
		photoURL: "https://np.kg/img_prods/all/id-7481-1.webp",
		name: "Canon EOS 250D",
		attributes: ["Цвет: Black", "Объектив: 18-55mm", "Сенсор: 24.1MP"],
		offers: [
			{
				id: "9-1",
				price: 599,
				currency: "USD",
				sellerName: "Canon Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
	{
		id: "10",
		photoURL: "https://object.pscloud.io/cms/cms/Photo/img_0_911_722_0_1.jpg",
		name: "Apple Watch Series 8",
		attributes: ["Цвет: Midnight", "Размер: 45mm", "GPS + Cellular"],
		offers: [
			{
				id: "10-1",
				price: 399,
				currency: "USD",
				sellerName: "Apple Store",
				rating: randomRating(),
				in_stock: randomStock(),
				nearest_delivery: getRandomDeliveryThisWeek(),
			},
		],
	},
];
