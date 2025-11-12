import { PAGE } from "@/lib/infrastructure/pages";
import { RouteBase } from "../config/route-base";
import type { GeneralRouteConfig } from "../types/router-types";
import NotFoundPage from "@/pages/not-found/not-found-page";

export class NotFoundRoute extends RouteBase {
	override get config(): GeneralRouteConfig {
		return {
			path: PAGE.NOT_FOUND,
			element: <NotFoundPage />,
		};
	}
}
