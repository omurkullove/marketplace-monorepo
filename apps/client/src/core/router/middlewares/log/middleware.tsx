import type { RouteBase } from "../../config/route-base";
import type { RouteMiddleware } from "../../types/router-types";
import LogWrapper from "./log-wrapper";

export class LogMiddleware implements RouteMiddleware {
	wrapRoute(route: RouteBase, element: React.ReactNode): React.ReactNode {
		return <LogWrapper route={route}>{element}</LogWrapper>;
	}
}
