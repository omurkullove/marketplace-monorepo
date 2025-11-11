import { PAGE } from "@/lib/infrastructure/pages";
import HomePage from "@/pages/home/home-page";
import { RouteBase } from "../config/route-base";
import { MiddlewareEnum, type GeneralRouteConfig } from "../types/router-types";
import AppLayout from "@/components/layout/app-layout";
import { DepsProvider } from "@/core/state/deps-context";

export class HomeRoute extends RouteBase {
	override get config(): GeneralRouteConfig {
		return {
			path: PAGE.HOME,
			element: <HomePage />,
			middleware: [MiddlewareEnum.LOG],
			wrap: [
				{ element: DepsProvider, props: { deps: this.deps } },
				{ element: AppLayout },
			],
		};
	}
}
