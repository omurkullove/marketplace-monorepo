import type { FirestoreCollections } from "@/common/collection/collection";
import type { PaginatedResponse } from "@marketplace/shared-packages";

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

	getPaginated<K extends keyof FirestoreCollections>(
		collection: K,
		limit: number,
		cursor?: string,
	): Promise<PaginatedResponse<FirestoreCollections[K]>>;

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
