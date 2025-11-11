import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RoutesCollector } from "./route-collector";
import type { RouteBase } from "./route-base";
import { RouteCleaner } from "./route-cleaner";
import type { RouteMiddleware } from "../types/router-types";
import { DepsContainer } from "@/core/state/deps-container";

export class RouterManager {
	private static _instance: RouterManager;
	private middlewares: RouteMiddleware[] = [];

	private constructor() {}

	public static get instance(): RouterManager {
		if (!RouterManager._instance) RouterManager._instance = new RouterManager();
		return RouterManager._instance;
	}

	public use(middleware: RouteMiddleware) {
		this.middlewares.push(middleware);
	}

	private mapRoutes(routes: RouteBase[], deps: DepsContainer) {
		return routes.map((route) => {
			let element = route.element;

			for (const middleware of this.middlewares) {
				element = middleware.wrapRoute(route, element);
			}

			return {
				path: route.path,
				element: (
					<RouteCleaner route={route} deps={deps}>
						{element}
					</RouteCleaner>
				),
			};
		});
	}

	public init() {
		const deps = new DepsContainer();
		const routes = RoutesCollector.instance.collect(deps);
		const reactRoutes = this.mapRoutes(routes, deps);

		const router = createBrowserRouter(reactRoutes);
		return <RouterProvider router={router} />;
	}
}
