import type { RouteBase } from "./route-base";
import { HomeRoute } from "../routes/home-route";
import type { DepsContainer } from "@/core/state/deps-container";
import { ProductDetailsRoute } from "../routes/product-details-route";
import { NotFoundRoute } from "../routes/not-found-route";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type RouteFactory = (deps: DepsContainer) => RouteBase<any>;

const routeFactories: RouteFactory[] = [
	(deps) => new HomeRoute(deps),
	(deps) => new ProductDetailsRoute(deps),
	(deps) => new NotFoundRoute(deps),
];

export class RoutesCollector {
	private static _instance: RoutesCollector;
	private routes: RouteBase[] = [];

	private constructor() {}

	public static get instance(): RoutesCollector {
		if (!RoutesCollector._instance)
			RoutesCollector._instance = new RoutesCollector();
		return RoutesCollector._instance;
	}

	public collect(deps: DepsContainer): RouteBase[] {
		this.routes = routeFactories.map((factory) => factory(deps));
		return this.routes;
	}

	public getAll(): RouteBase[] {
		return this.routes;
	}
}
