import { useSyncExternalStore } from "react";

type Listener<T> = (state: T) => void;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export class Store<State extends Record<string, any>> {
	private state: State;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private listeners: Map<keyof State, Set<Listener<any>>> = new Map();

	constructor(initialState: State) {
		this.state = initialState;

		for (const key of Object.keys(initialState)) {
			this.listeners.set(key as keyof State, new Set());
		}
	}

	getState(): State {
		return this.state;
	}

	subscribe<K extends keyof State>(
		key: K,
		listener: Listener<State[K]>,
	): () => void {
		const listenersForKey = this.listeners.get(key);
		if (listenersForKey) {
			listenersForKey.add(listener);
		}

		return () => {
			const currentListeners = this.listeners.get(key);
			if (currentListeners) {
				currentListeners.delete(listener);
			}
		};
	}

	setState<K extends keyof State>(key: K, value: State[K]) {
		this.state = { ...this.state, [key]: value };

		const listenersForKey = this.listeners.get(key);
		if (listenersForKey) {
			for (const listener of listenersForKey) {
				listener(value);
			}
		}
	}

	use<K extends keyof State>(key: K): State[K] {
		return useSyncExternalStore(
			(callback) => this.subscribe(key, callback),
			() => this.state[key],
		);
	}
}
