import type { ReactNode, ComponentType } from "react";
import type { PageValue } from "@/lib/infrastructure/pages";
import type { RouteBase } from "../config/route-base";

export enum MiddlewareEnum {
	LOG = "LOG",
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Props = Record<string, any>;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type WrapItem<P = any> = {
	element: React.ComponentType<{ children: React.ReactNode } & P>;
	props?: P;
};
export type GeneralRouteConfig = {
	path: PageValue;
	element: ReactNode;
	wrap?: WrapItem[];
	middleware?: MiddlewareEnum[];
};

export interface RouteMiddleware {
	wrapRoute(route: RouteBase, element: ReactNode): ReactNode;
}
