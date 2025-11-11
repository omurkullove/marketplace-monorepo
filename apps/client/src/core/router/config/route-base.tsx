import type { GeneralRouteConfig } from "../types/router-types";
import type { DepsContainer } from "@/core/state/deps-container";

export abstract class RouteBase<Deps extends DepsContainer = DepsContainer> {
	protected deps: Deps;

	constructor(deps: Deps) {
		this.deps = deps;
	}

	abstract get config(): GeneralRouteConfig;

	get rememberStore(): boolean {
		return true;
	}

	get path() {
		return this.config.path;
	}

	get element() {
		const { element, wrap } = this.config;

		let wrappedElement = element;

		if (wrap?.length) {
			for (const item of [...wrap].reverse()) {
				const Component = item.element;
				const props = item.props;
				wrappedElement = <Component {...props}>{wrappedElement}</Component>;
			}
		}

		return wrappedElement;
	}

	toReactRoute() {
		return {
			path: this.path,
			element: this.element,
		};
	}
}
