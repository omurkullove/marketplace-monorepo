import type { PaginatedResponse } from "@marketplace/shared-packages";
import type { FirestoreCollections } from "../collection/collection";
import { db } from "../firebase/config";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { convertProductTimestamps } from "../tools/convert-product-timestamp";

export class FirebaseDatabaseRepository implements InterfaceDatabaseRepository {
	async getPaginated<K extends keyof FirestoreCollections>(
		collection: K,
		limit: number,
		cursor?: string,
	): Promise<PaginatedResponse<FirestoreCollections[K]>> {
		let query = db
			.collection(collection)
			.orderBy("id")
			.limit(limit + 1);

		if (cursor) {
			const lastDocSnapshot = await db.collection(collection).doc(cursor).get();
			if (lastDocSnapshot.exists) {
				query = query.startAfter(lastDocSnapshot);
			}
		}

		const snapshot = await query.get();
		const items = snapshot.docs.map((doc) => ({
			...convertProductTimestamps(doc.data() as FirestoreCollections[K]),
			id: doc.id,
		}));

		let nextCursor: string | null = null;
		if (items.length > limit) {
			const nextItem = items.pop();
			if (nextItem) nextCursor = nextItem.id;
		}

		return { items, limit, nextCursor };
	}
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
