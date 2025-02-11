import { test, describe, expect } from "bun:test";
import { page, site, kirby, file } from "../../src/kql";
import {
	MethodWithoutParamsTestDefinition,
	OmittedProperties,
	testQuery,
	type MethodWithParamsTestDefinition,
} from "./setup";
import { type Block } from "../../src/types";

describe("Kql Block Methods Test", () => {
	test("Block methods with no arguments", async () => {
		const methods = [
			"content",
			"id",
			"isEmpty",
			"isHidden",
			"isNotEmpty",
			"parent",
			"toField",
			"type",
		] as const satisfies MethodWithoutParamsTestDefinition<
			Block,
			OmittedProperties
		>;

		for (const method of methods) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page().content().toBlocks().first()[method]?.(),
					},
				};
				await testQuery(query, "block");
				console.log(`✓ Block method ${method} works`);
			} catch (error) {
				console.log(`❌ Block method ${method} failed`);
			}
		}
	});

	test("Block methods with arguments", async () => {
		const methods = {
			toHtml: [
				{
					className: "block",
					style: "margin: 1em 0",
					attributes: { "data-type": "text" },
				},
			],

			attrs: [{ class: "block", id: "text-block" }],
		} satisfies MethodWithParamsTestDefinition<Block, OmittedProperties>;

		for (const [method, args] of Object.entries(methods)) {
			try {
				const query = {
					query: page("kql-test"),
					select: {
						test: page()
							.content()
							.toBlocks()
							.first()
							[method]?.(...args),
					},
				};
				await testQuery(query, "block");
				console.log(`✓ Block method ${method} works`);
			} catch (error) {
				console.log(`❌ Block method ${method} failed`);
			}
		}
	});
});
