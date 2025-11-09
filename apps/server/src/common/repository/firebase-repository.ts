import type { FirestoreCollections } from "../collection/collection";
import { db } from "../firebase/config";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { convertProductTimestamps } from "../tools/convert-product-timestamp";

export class FirebaseDatabaseRepository implements InterfaceDatabaseRepository {
	async getAll<K extends keyof FirestoreCollections>(
		collection: K,
	): Promise<Array<FirestoreCollections[K]>> {
		const snapshot = await db.collection("products").get();
		return snapshot.docs.map((doc) => {
			const data = doc.data() as FirestoreCollections[K];
			return {
				...convertProductTimestamps(data),
				id: doc.id,
			};
		});
	}
	async getById<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
	): Promise<FirestoreCollections[K] | null> {
		const doc = await db.collection(collection).doc(id).get();
		if (!doc.exists) return null;

		const data = doc.data() as FirestoreCollections[K];
		return {
			...convertProductTimestamps(data),
			id: doc.id,
		};
	}
	async create<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
		data: FirestoreCollections[K],
	) {
		await db.collection(collection).doc(id).set(data);
	}

	async update<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
		data: Partial<FirestoreCollections[K]>,
	) {
		await db.collection(collection).doc(id).update(data);
	}

	async delete<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
	) {
		await db.collection(collection).doc(id).delete();
	}
}
