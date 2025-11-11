import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "VITE_");

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@marketplace/shared-packages": path.resolve(
					__dirname,
					"../../shared-packages/src",
				),
				"@": path.resolve(__dirname, "./src"),
			},
		},

		esbuild: {
			drop: mode === "production" ? ["console", "debugger"] : [],
		},
	};
});
