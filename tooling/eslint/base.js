/// <reference types="./types.d.ts" />

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";
import { fileURLToPath } from "url";
import prettier from "eslint-config-prettier";

const gitignorePath = fileURLToPath(new URL("../../.gitignore", import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	prettier,

	{
		ignores: ["**/*.config.*", "**/*.d.ts"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	}
);
