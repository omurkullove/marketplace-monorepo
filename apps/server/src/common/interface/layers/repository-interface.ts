import type { FirestoreCollections } from "@/common/collection/collection";

export interface InterfaceDatabaseRepository {
	create<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
		payload: FirestoreCollections[K],
	): Promise<void>;

	getAll<K extends keyof FirestoreCollections>(
		collection: K,
	): Promise<Array<FirestoreCollections[K]>>;

	getById<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
	): Promise<FirestoreCollections[K] | null>;

	update<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
		payload: Partial<FirestoreCollections[K]>,
	): Promise<void>;

	delete<K extends keyof FirestoreCollections>(
		collection: K,
		id: string,
	): Promise<void>;
}
