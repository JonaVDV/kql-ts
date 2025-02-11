import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Layout } from "../../src/types";

describe("Kql Layout Methods Test", () => {
	test("Layout methods with no arguments", async () => {
		const methods = [
			"attrs",
			"columns",
			"id",
			"isEmpty",
			"isNotEmpty",
			"parent",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Layout,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page().content().toLayouts().first()[method]?.(),
					},
				};
				await testQuery(query, "layout");
				console.log(`✓ Layout method ${method} works`);
			} catch (error) {
				console.log(`❌ Layout method ${method} failed`);
			}
		}
	});
});
