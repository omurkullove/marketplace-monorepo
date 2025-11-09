import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@marketplace/shared-packages": path.resolve(
				__dirname,
				"../../shared-packages/src",
			),
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 5173,
		host: "localhost",
	},
});
