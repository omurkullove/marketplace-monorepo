import React from "react";
import type { RouteBase } from "../../config/route-base";

const LogWrapper: React.FC<{ route: RouteBase; children: React.ReactNode }> = ({
	route,
	children,
}) => {
	const renderCount = React.useRef<number>(0);

	renderCount.current += 1;

	React.useEffect(() => {
		const enterTime = Date.now();
		console.group(`[LogMiddleware] Route: ${route.path}`);
		console.log(`Entered route: ${route.path}`);
		console.log(`Render count: ${renderCount.current}`);

		const originalFetch = window.fetch;
		window.fetch = async (...args) => {
			const fetchStart = Date.now();
			const result = await originalFetch(...args);
			console.log(
				`[LogMiddleware] Fetch request to ${args[0]} took ${
					Date.now() - fetchStart
				}ms`,
			);
			return result;
		};

		return () => {
			const duration = Date.now() - enterTime;
			console.log(`Leaving route: ${route.path}, spent ${duration}ms on page`);
			console.log(`Total renders during stay: ${renderCount.current}`);
			console.groupEnd();

			window.fetch = originalFetch;
		};
	}, [route]);

	return <>{children}</>;
};

export default LogWrapper;
