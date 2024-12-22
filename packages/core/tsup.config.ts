import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: {},
  minify: true,
  splitting: true,
  tsconfig: "tsconfig.json",
  format: ["esm"],
});
