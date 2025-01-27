/**
 * Since the ecosystem hasn't fully migrated to ESLint's new FlatConfig system yet,
 * we "need" to type some of the plugins manually :(
 */

declare module "eslint-plugin-react-hooks" {
	import type { Linter, Rule } from "eslint";

	export const configs: {
		recommended: {
			rules: {
				"rules-of-hooks": Linter.RuleEntry;
				"exhaustive-deps": Linter.RuleEntry;
			};
		};
	};
	export const rules: Record<string, Rule.RuleModule>;
}

declare module "@next/eslint-plugin-next" {
	import type { Linter, Rule } from "eslint";

	export const configs: {
		recommended: { rules: Linter.RulesRecord };
		"core-web-vitals": { rules: Linter.RulesRecord };
	};
	export const rules: Record<string, Rule.RuleModule>;
}

declare module "eslint-config-prettier" {
	import type { Linter } from "eslint";

	const config: { rules: Linter.RulesRecord };
	export = config;
}
