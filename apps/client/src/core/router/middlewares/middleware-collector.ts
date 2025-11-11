import type { RouteBase } from "../config/route-base";
import { MiddlewareEnum, type RouteMiddleware } from "../types/router-types";
import { LogMiddleware } from "./log/middleware";

type MiddlewareMap = Record<MiddlewareEnum, RouteMiddleware>;

export class MiddlewareCollector implements RouteMiddleware {
	private middlewares: MiddlewareMap;

	constructor() {
		this.middlewares = {
			[MiddlewareEnum.LOG]: new LogMiddleware(),
		};
	}

	public wrapRoute(
		route: RouteBase,
		element: React.ReactNode,
	): React.ReactNode {
		if (!route.config.middleware?.length) return element;

		let wrappedElement = element;

		for (const middlewareName of route.config.middleware) {
			const middleware = this.middlewares[middlewareName];
			if (middleware) {
				wrappedElement = middleware.wrapRoute(route, wrappedElement);
			} else {
				console.warn(`Middleware "${middlewareName}" not found`);
			}
		}

		return wrappedElement;
	}
}
