import dotenv from "dotenv";

dotenv.config({ path: ".server.env" });

import { COLLECTION } from "../collection/collection";
import { productsDTO } from "../dto/product-dto";
import { db } from "../firebase/config";

async function seedProducts() {
	try {
		const batch = db.batch();
		for (const product of productsDTO) {
			const docRef = db.collection(COLLECTION.PRODUCTS).doc();
			batch.set(docRef, product);
		}

		await batch.commit();
		console.log("✅ Products seeded successfully!");
	} catch (error) {
		console.error("❌ Error seeding products:", error);
	}
}

seedProducts();
