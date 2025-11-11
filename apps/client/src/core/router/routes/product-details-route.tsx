import { PAGE } from "@/lib/infrastructure/pages";
import { RouteBase } from "../config/route-base";
import { MiddlewareEnum, type GeneralRouteConfig } from "../types/router-types";
import AppLayout from "@/components/layout/app-layout";
import ProductDetailsPage from "@/pages/product-details/product-details-page";
import { DepsProvider } from "@/core/state/deps-context";

export class ProductDetailsRoute extends RouteBase {
	get rememberStore() {
		return false;
	}

	override get config(): GeneralRouteConfig {
		return {
			path: PAGE.PRODUCT_DETAILS,
			element: <ProductDetailsPage />,
			middleware: [MiddlewareEnum.LOG],
			wrap: [
				{ element: DepsProvider, props: { deps: this.deps } },
				{ element: AppLayout },
			],
		};
	}
}
