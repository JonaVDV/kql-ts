import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	dts: true,
	minify: true,
	splitting: true,
	tsconfig: "tsconfig.json",
	format: ["esm"],
});
