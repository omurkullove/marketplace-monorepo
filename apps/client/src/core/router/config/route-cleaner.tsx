import React from "react";
import type { RouteBase } from "./route-base";
import type { DepsContainer } from "@/core/state/deps-container";

type Props = {
	route: RouteBase;
	deps: DepsContainer;
	children: React.ReactNode;
};

export const RouteCleaner = ({ route, deps, children }: Props) => {
	React.useEffect(() => {
		return () => {
			if (!route.rememberStore) {
				deps.clearRouteScopedDeps();
			}
		};
	}, [route, deps]);

	return <>{children}</>;
};
