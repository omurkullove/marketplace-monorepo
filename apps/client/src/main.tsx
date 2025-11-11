import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterManager } from "./core/router/config/route-manager";
import { MiddlewareCollector } from "./core/router/middlewares/middleware-collector.ts";
import "./styles/global.css";

const middlewareCollector = new MiddlewareCollector();

RouterManager.instance.use({
	wrapRoute: (route, element) => middlewareCollector.wrapRoute(route, element),
});

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

createRoot(rootElement).render(
	<StrictMode>{RouterManager.instance.init()}</StrictMode>,
);
