import type { PaginatedResponse } from "@marketplace/shared-packages";
import type { FirestoreCollections } from "../collection/collection";
import { db } from "../firebase/config";
import type { InterfaceDatabaseRepository } from "../interface/layers/repository-interface";
import { convertProductTimestamps } from "../tools/convert-product-timestamp";
import * as admin from "firebase-admin";

export class FirebaseDatabaseRepository implements InterfaceDatabaseRepository {
	async getPaginated<K extends keyof FirestoreCollections>(
		collection: K,
		size: number,
		page = 1,
	): Promise<PaginatedResponse<FirestoreCollections[K]>> {
		const collectionRef = db.collection(collection as string);

		const offset = (page - 1) * size;

		const snapshot = await collectionRef
			.orderBy("id")
			.orderBy(admin.firestore.FieldPath.documentId())
			.limit(offset + size)
			.get();

		const allItems = snapshot.docs.map((doc) => ({
			...convertProductTimestamps(doc.data() as FirestoreCollections[K]),
			id: doc.id,
		}));

		const items = allItems.slice(offset, offset + size);

		const totalSnapshot = await collectionRef.count().get();
		const total = totalSnapshot.data().count ?? 0;

		const totalPages = Math.ceil(total / size);

		return {
			items,
			size,
			nextPage: page < totalPages ? page + 1 : null,
			total,
		};
	}

	async getAll<K extends keyof FirestoreCollections>(
		collection: K,
	): Promise<Array<FirestoreCollections[K]>> {
		const snapshot = await db.collection(collection).get();
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
