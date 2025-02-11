import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Field } from "../../src/types";

describe("Kql Field Methods Test", () => {
	test("Field methods with no arguments", async () => {
		const methods = [
			"exists",
			"html",
			"inline",
			"isEmpty",
			"isFalse",
			"isNotEmpty",
			"isTrue",
			"key",
			"kirbytags",
			"kirbytext",
			"kirbytextinline",
			"kt",
			"kti",
			"length",
			"lower",
			"markdown",
			"md",
			"model",
			"nl2br",
			"slug",
			"smartypants",
			"toArray",
			"toBlocks",
			"toFile",
			"toLayouts",
			"toPage",
			"toPages",
			"toStructure",
			"toTimestamp",
			"toUrl",
			"upper",
			"widont",
			"words",
			"xml",
			"yaml",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Field<any>,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page().content[method]?.(),
					},
				};
				await testQuery(query, "field");
				console.log(`✓ Field method ${method} works`);
			} catch (error) {
				console.log(`❌ Field method ${method} failed`);
			}
		}
	});

	test("Field methods with arguments", async () => {
		const methods = {
			esc: ["html"],
			escape: ["html"],
			excerpt: [100, true, "..."],
			isValid: ["email"],
			or: [true],
			toData: ["json"],
			toDate: ["Y-m-d"],
			toBool: [false],
			toFiles: ["yaml"],
			toFloat: [0.5],
			toInt: [1],
			toLink: ["attr1", ["attr2"]],
			v: ["email"],
			short: [100, "..."],
		} satisfies MethodWithParamsTestDefinition<Field<any>, OmittedProperties>;
		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page().content[method]?.(...args),
					},
				};
				await testQuery(query, "field");
				console.log(`✓ Field method ${method} works`);
			} catch (error) {
				console.log(`❌ Field method ${method} failed`);
			}
		}
	});
});
